import { GET_INTERNAL_STATS_URL } from "@/public/functions/constants";
import { msToTime } from "@/public/functions/logic";
import { type EventStatsResponse } from "@/public/interfaces/Stats";
import useSWR from "swr";
import Leaderboard from "./Leaderboard";
import { PlayerEntry } from "./PlayerEntry";
import { Spinner } from "./Spinner";

const SPLITS = [
  "nether",
  "first_structure",
  "second_structure",
  "first_portal",
  "stronghold",
  "end",
];

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status === 404 ? "Invalid event!" : "Unable to load event stats!");
  }

  const { players } = (await response.json()) as EventStatsResponse;
  return SPLITS.map((split) => ({
    split,
    players: players
      .map(({ nickname, splits }) => ({ nickname, ...splits[split] }))
      .sort((a, b) => b.count - a.count),
  }));
};

interface Props {
  event: string;
  rows: number;
  cols: number;
}

export default function StatsLeaderboard({ event, rows, cols }: Props) {
  const { data, error, isLoading } = useSWR(GET_INTERNAL_STATS_URL(event), fetcher, {
    refreshInterval: 60_000,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <h1>{error?.message || "Unable to load event stats!"}</h1>;
  }

  return (
    <div className="space-y-4">
      {data.map(({ split, players }) => (
        <Leaderboard
          key={split}
          rows={rows}
          cols={cols}
          generateCell={(i, j) => {
            const playerIndex = rows * i + j;
            const player = players[playerIndex];
            if (!player) return;

            const average = player.avgMs === null ? "N/A" : msToTime(player.avgMs).replace(/^0(?=\d:)/, "");
            return (
              <tr key={j}>
                <td className="p-0">
                  <PlayerEntry
                    place={playerIndex + 1}
                    name={player.nickname ?? "N/A"}
                    scoreText={`${player.count} - ${average}`}
                    hideImage={!player.nickname}
                  />
                </td>
              </tr>
            );
          }}
        />
      ))}
    </div>
  );
}
