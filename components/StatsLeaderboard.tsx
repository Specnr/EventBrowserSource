import { formatSplitTime, useEventStats } from "@/public/functions/stats";
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

interface Props {
  event: string;
  rows: number;
  cols: number;
}

export default function StatsLeaderboard({ event, rows, cols }: Props) {
  const { data, error, isLoading } = useEventStats(event);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <h1>{error?.message || "Unable to load event stats!"}</h1>;
  }

  return (
    <div className="space-y-4">
      {SPLITS.map((split) => {
        const players = data.players
          .map(({ nickname, splits }) => ({ nickname, ...splits[split] }))
          .sort((a, b) => b.count - a.count);

        return (
          <Leaderboard
            key={split}
            rows={rows}
            cols={cols}
            generateCell={(i, j) => {
              const playerIndex = rows * i + j;
              const player = players[playerIndex];
              if (!player) return;

              return (
                <tr key={j}>
                  <td className="p-0">
                    <PlayerEntry
                      place={playerIndex + 1}
                      name={player.nickname ?? "N/A"}
                      scoreText={`${player.count} - ${formatSplitTime(player.avgMs)}`}
                      hideImage={!player.nickname}
                    />
                  </td>
                </tr>
              );
            }}
          />
        );
      })}
    </div>
  );
}
