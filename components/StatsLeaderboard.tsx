import { GET_EVENT_DATA_URL, GET_INTERNAL_STATS_URL } from "@/public/functions/constants";
import { Spinner } from "./Spinner";
import useSWR from "swr";
import Leaderboard from "./Leaderboard";
import { Result } from "@/public/interfaces/Rankings";
import { getScoreTextFromStat, getSplitStatsFromResult, getStatsInputFromResult } from "@/public/functions/stats";
import { PlayerEntry } from "./PlayerEntry";
import { Stat, StatsResult } from "@/public/interfaces/Stats";

const fetcher = async (url: string, statsEventDay: number) => {
  const data = (await fetch(url).then((res) => res.json())) as Result;
  const input = await getStatsInputFromResult(data, statsEventDay)
  if (!input) {
    return {}
  }

  const stats = (await fetch(GET_INTERNAL_STATS_URL(input.whitelist, input.start))
    .then((res) => res.json())) as { stats: StatsResult, nickname: string }[];

  return {
    nether: getSplitStatsFromResult(stats, "nether"),
    firstStructure: getSplitStatsFromResult(stats, "first_structure"),
    secondStructure: getSplitStatsFromResult(stats, "second_structure"),
    firstPortal: getSplitStatsFromResult(stats, "first_portal"),
    stronghold: getSplitStatsFromResult(stats, "stronghold"),
    end: getSplitStatsFromResult(stats, "end"),
  }
}

interface Props {
  event: string;
  rows: number;
  cols: number;
  statsEventDay: number;
}

export default function StatsLeaderboard({ event, rows, cols, statsEventDay }: Props) {
  const { data, error, isLoading } = useSWR(
    GET_EVENT_DATA_URL(event), (url: string) => fetcher(url, statsEventDay), { refreshInterval: 60 * 1000, }
  )
  
  if (isLoading) {
    return <Spinner />
  }

  if (!data || error || !data.nether) {
    console.error(error, data)
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
                  scoreText={getScoreTextFromStat(data.nether[playerIndex].stats as Stat)}
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
          if (playerIndex >= data.firstStructure.length) {
            return
          }

          return (
            <tr key={j}>
              <td className="p-0">
                <PlayerEntry
                  place={playerIndex + 1}
                  name={data.firstStructure[playerIndex].nickname}
                  scoreText={getScoreTextFromStat(data.firstStructure[playerIndex].stats as Stat)}
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
                  scoreText={getScoreTextFromStat(data.secondStructure[playerIndex].stats as Stat)}
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
                  scoreText={getScoreTextFromStat(data.firstPortal[playerIndex].stats as Stat)}
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
                  scoreText={getScoreTextFromStat(data.stronghold[playerIndex].stats as Stat)}
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
          if (playerIndex >= data.end.length) {
            return
          }

          return (
            <tr key={j}>
              <td className="p-0">
                <PlayerEntry
                  place={playerIndex + 1}
                  name={data.end[playerIndex].nickname}
                  scoreText={getScoreTextFromStat(data.end[playerIndex].stats as Stat)}
                />
              </td>
            </tr>
          )
        }}
      />
    </div>
  )
}