import { Result } from "../interfaces/Rankings";
import { Stat } from "../interfaces/Stats";
import { uuidToIGN } from "./player";

export const getStatsInputFromResult = async (result: Result) => {
  let start = result.event.starts[0]
  result.event.starts.forEach(s => {
    if ((s * 1000) < Date.now()) {
      start = s
    }
  })

  const whitelist = await Promise.all(
    result.event.whitelist.map(async p => await uuidToIGN(p))
  )

  return { whitelist, start }
}

export const getScoreTextFromStat = (s: Stat) => `${s.count} - ${s.avg}`