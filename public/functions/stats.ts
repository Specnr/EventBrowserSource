import { Result } from "../interfaces/Rankings";
import { Stat } from "../interfaces/Stats";
import { uuidToIGN } from "./player";

export const getStatsInputFromResult = async (result: Result) => {
  let start = -1
  result.event.starts.forEach(s => {
    if ((s * 1000) < Date.now()) {
      start = s
    }
  })

  // Only get stats is event has started
  if (start === -1) {
    return null
  }

  const whitelist = await Promise.all(
    result.event.whitelist.map(async p => await uuidToIGN(p))
  )

  return { whitelist, start }
}

export const getScoreTextFromStat = (s: Stat) => `${s.count} - ${s.avg}`