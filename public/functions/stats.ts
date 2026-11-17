import { GET_INTERNAL_STATS_URL } from "@/public/functions/constants";
import { msToTime } from "@/public/functions/logic";
import { type EventStatsResponse } from "@/public/interfaces/Stats";
import useSWR from "swr";

async function fetchEventStats(url: string): Promise<EventStatsResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status === 404 ? "Invalid event!" : "Unable to load event stats!");
  }

  return response.json();
}

export function useEventStats(event: string) {
  return useSWR(GET_INTERNAL_STATS_URL(event), fetchEventStats, {
    refreshInterval: 60_000,
  });
}

export function formatSplitTime(ms: number | null): string {
  return ms === null ? "N/A" : msToTime(ms).replace(/^0(?=\d:)/, "");
}
