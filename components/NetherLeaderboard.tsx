import { GET_EVENT_DATA_URL, GET_INTERNAL_STATS_URL } from "@/public/functions/constants";
import { Spinner } from "./Spinner";
import useSWR from "swr";
import Leaderboard from "./Leaderboard";
import { Result } from "@/public/interfaces/Rankings";
import { getScoreTextFromStat, getStatsInputFromResult } from "@/public/functions/stats";
import { PlayerEntry } from "./PlayerEntry";
import { StatsResult } from "@/public/interfaces/Stats";

const fetcher = async (url: string) => {
  const data = (await fetch(url).then((res) => res.json())) as Result;
  const input = await getStatsInputFromResult(data)
  if (!input) {
    return []
  }

  const stats = (await fetch(GET_INTERNAL_STATS_URL(input.whitelist, input.start))
    .then((res) => res.json())) as { stats: StatsResult, nickname: string }[];

  stats.sort((a, b) => b.stats.nether.count - a.stats.nether.count)
  return stats
}

interface Props {
  eventId: string;
  rows: number;
  cols: number;
}

export default function NetherLeaderboard({ eventId, rows, cols }: Props) {
  const { data, error, isLoading } = useSWR(
    GET_EVENT_DATA_URL(eventId), fetcher, { refreshInterval: 60 * 1000, }
  )
  
  if (isLoading) {
    return <Spinner />
  }

  if (!data || error) {
    return <h1>Invalid event!</h1>
  }

  return (
    <Leaderboard
      rows={rows}
      cols={cols}
      generateCell={(i, j) => {
        const playerIndex = (rows * i) + j
        if (playerIndex >= data.length) {
          return
        }

        return (
          <tr key={j}>
            <td className="p-0">
              <PlayerEntry
                place={playerIndex + 1}
                name={data[playerIndex].nickname}
                scoreText={getScoreTextFromStat(data[playerIndex].stats.nether)}
              />
            </td>
          </tr>
        )
      }}
    />
  )
}