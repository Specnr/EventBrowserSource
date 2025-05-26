import { Result } from "../interfaces/Rankings";
import { Stat, StatsResult } from "../interfaces/Stats";
import { uuidToIGN } from "./player";

export const getStatsInputFromResult = async (result: Result, statsEventDay: number) => {
  const start = result.event.starts[statsEventDay < result.event.starts.length ? statsEventDay : 0]

  const whitelist = await Promise.all(
    result.event.whitelist.map(async p => await uuidToIGN(p))
  )

  return { whitelist, start }
}

export const getScoreTextFromStat = (s: Stat) => `${s.count} - ${s.avg}`

export const getSplitStatsFromResult = (stats: { stats: StatsResult, nickname: string }[], split: string) => {
  return [...stats].filter(s => !s.stats.error).sort((a, b) => (b.stats[split as keyof StatsResult]! as Stat).count - (a.stats[split as keyof StatsResult]! as Stat).count).map(s => ({ nickname: s.nickname, stats: s.stats[split as keyof StatsResult] }))
}
