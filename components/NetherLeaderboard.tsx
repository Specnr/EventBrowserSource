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
    return {}
  }

  const stats = (await fetch(GET_INTERNAL_STATS_URL(input.whitelist, input.start))
    .then((res) => res.json())) as { stats: StatsResult, nickname: string }[];

  return {
    nether: stats.toSorted((a, b) => b.stats.nether.count - a.stats.nether.count).map(s => ({ nickname: s.nickname, stats: s.stats.nether })),
    secondStructure: stats.toSorted((a, b) => b.stats.second_structure.count - a.stats.second_structure.count).map(s => ({ nickname: s.nickname, stats: s.stats.second_structure })),
    firstPortal: stats.toSorted((a, b) => b.stats.first_portal.count - a.stats.first_portal.count).map(s => ({ nickname: s.nickname, stats: s.stats.first_portal })),
    stronghold: stats.toSorted((a, b) => b.stats.stronghold.count - a.stats.stronghold.count).map(s => ({ nickname: s.nickname, stats: s.stats.stronghold }))
  }
}

interface Props {
  event: string;
  rows: number;
  cols: number;
}

export default function NetherLeaderboard({ event, rows, cols }: Props) {
  const { data, error, isLoading } = useSWR(
    GET_EVENT_DATA_URL(event), fetcher, { refreshInterval: 60 * 1000, }
  )
  
  if (isLoading) {
    return <Spinner />
  }

  if (!data || error || !data.nether) {
    return <h1>Invalid event!</h1>
  }

  return (
    <div className="space-y-4">
      <Leaderboard
        rows={rows}
        cols={cols}
        generateCell={(i, j) => {
          const playerIndex = (rows * i) + j
          if (playerIndex >= data.nether.length) {
            return
          }

          return (
            <tr key={j}>
              <td className="p-0">
                <PlayerEntry
                  place={playerIndex + 1}
                  name={data.nether[playerIndex].nickname}
                  scoreText={getScoreTextFromStat(data.nether[playerIndex].stats)}
                />
              </td>
            </tr>
          )
        }}
      />
      <Leaderboard
        rows={rows}
        cols={cols}
        generateCell={(i, j) => {
          const playerIndex = (rows * i) + j
          if (playerIndex >= data.secondStructure.length) {
            return
          }

          return (
            <tr key={j}>
              <td className="p-0">
                <PlayerEntry
                  place={playerIndex + 1}
                  name={data.secondStructure[playerIndex].nickname}
                  scoreText={getScoreTextFromStat(data.secondStructure[playerIndex].stats)}
                />
              </td>
            </tr>
          )
        }}
      />
      <Leaderboard
        rows={rows}
        cols={cols}
        generateCell={(i, j) => {
          const playerIndex = (rows * i) + j
          if (playerIndex >= data.firstPortal.length) {
            return
          }

          return (
            <tr key={j}>
              <td className="p-0">
                <PlayerEntry
                  place={playerIndex + 1}
                  name={data.firstPortal[playerIndex].nickname}
                  scoreText={getScoreTextFromStat(data.firstPortal[playerIndex].stats)}
                />
              </td>
            </tr>
          )
        }}
      />
      <Leaderboard
        rows={rows}
        cols={cols}
        generateCell={(i, j) => {
          const playerIndex = (rows * i) + j
          if (playerIndex >= data.stronghold.length) {
            return
          }

          return (
            <tr key={j}>
              <td className="p-0">
                <PlayerEntry
                  place={playerIndex + 1}
                  name={data.stronghold[playerIndex].nickname}
                  scoreText={getScoreTextFromStat(data.stronghold[playerIndex].stats)}
                />
              </td>
            </tr>
          )
        }}
      />
    </div>
  )
}