import { GET_STATS_URL } from "@/public/functions/constants";
import { StatsResult } from "@/public/interfaces/Stats";
import { type NextRequest } from "next/server";

const CACHE_TTL_MS = 60_000;

type PlayerStatsEntry = { stats: StatsResult; nickname: string };

interface CacheEntry {
  data: PlayerStatsEntry[];
  fetchedAt: number;
}

const responseCache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<PlayerStatsEntry[]>>();
const playerStaleCache = new Map<string, StatsResult>();

const cacheKey = (names: string[], start: number) =>
  `${start}:${[...names].sort().join(",")}`;

const playerCacheKey = (name: string, start: number) => `${start}:${name}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isValidStatsResult = (data: unknown): data is StatsResult => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const record = data as Record<string, unknown>;
  if (record.error) {
    return false;
  }

  const nether = record.nether as { count?: unknown } | undefined;
  return nether != null && typeof nether.count === "number";
};

const fetchPlayerStats = async (
  name: string,
  start: number
): Promise<StatsResult | null> => {
  const url = GET_STATS_URL(name, start);
  const staleKey = playerCacheKey(name, start);

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url);

    if (res.ok) {
      const data = (await res.json()) as unknown;
      if (isValidStatsResult(data)) {
        playerStaleCache.set(staleKey, data);
        return data;
      }
      break;
    }

    if (res.status === 429 && attempt === 0) {
      const retryAfterHeader = res.headers.get("Retry-After");
      const retryAfterSeconds = retryAfterHeader
        ? parseInt(retryAfterHeader, 10)
        : 1;
      await sleep((Number.isNaN(retryAfterSeconds) ? 1 : retryAfterSeconds) * 1000);
      continue;
    }

    break;
  }

  return playerStaleCache.get(staleKey) ?? null;
};

const fetchAllStats = async (
  names: string[],
  start: number
): Promise<PlayerStatsEntry[]> => {
  const entries = await Promise.all(
    names.map(async (nickname) => {
      const stats = await fetchPlayerStats(nickname, start);
      if (!stats) {
        return null;
      }

      return { stats, nickname };
    })
  );

  return entries.filter((entry): entry is PlayerStatsEntry => entry !== null);
};

const getStats = async (
  names: string[],
  start: number
): Promise<PlayerStatsEntry[]> => {
  const key = cacheKey(names, start);
  const cached = responseCache.get(key);

  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const existing = inFlight.get(key);
  if (existing) {
    return existing;
  }

  const promise = (async () => {
    try {
      const data = await fetchAllStats(names, start);
      responseCache.set(key, { data, fetchedAt: Date.now() });
      return data;
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);
  return promise;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  if (!searchParams.has("names") || !searchParams.has("start")) {
    return new Response(`Invalid params`, {
      status: 400,
    });
  }

  const names = (searchParams.get("names") as string)
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  const start = parseInt(searchParams.get("start") as string, 10);

  if (names.length === 0 || Number.isNaN(start)) {
    return new Response(`Invalid params`, {
      status: 400,
    });
  }

  const stats = await getStats(names, start);

  return Response.json(stats);
};
