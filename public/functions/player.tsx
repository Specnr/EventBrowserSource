import { PlayerRanking } from "../interfaces/Rankings"
import { msToTime } from "./logic"

const DEFAULT_IGN = "N/A"

export const NICKNAME_CACHE = new Map<string, string>([
  ["aa5a894a-4d53-40f4-9683-fdfd1ea9c523", "Skycrab"],
  ["f1611fd3-39b1-401f-8415-4afee3a5f14a", "Bloopy"],
  ["0b6c44a4-81e1-4c7e-88ac-836c92499ff4", "Tiger"],
  ["e3dd1692-92db-49d4-9fc5-b23c52464bcc", "Redpill"],
  ["92b63a39-b36a-445f-a94c-77ae212dcea3", "Mongey"],
  ["fdbf51f5-5dcb-4a3a-bb49-5f6b18589886", "JASON"],
  ["af22aaab-9ee7-4596-a357-8bd6345d25b5", "Priffin"]
])

export const uuidToIGN = async (uuid: string) => {
  if (NICKNAME_CACHE.has(uuid)) {
    return NICKNAME_CACHE.get(uuid)!
  }

  if (!uuid) {
    return DEFAULT_IGN
  }

  const endpoint = `https://playerdb.co/api/player/minecraft/${uuid}`
  try {
    const resp = await fetch(endpoint)

    if (!resp.ok) {
      return DEFAULT_IGN
    }

    const data = await resp.json()
    if (!data.success) {
      return DEFAULT_IGN
    }

    return data.data.player.username as string
  } catch {
    return DEFAULT_IGN
  }
}

export const uuidToHead = (uuid: string) => {
  const endpoint = "https://api.mineatar.io/face/";
  return `${endpoint}${uuid}`;
};

export const getScoreTextFromPR = (p: PlayerRanking) => (
  `${p.totalPoints} - ${msToTime(p.completions[0].time)}`
)