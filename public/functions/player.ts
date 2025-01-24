import { PlayerRanking } from "../interfaces/Rankings"
import { msToTime } from "./logic"

const DEFAULT_IGN = "N/A"

export const NICKNAME_CACHE = new Map<string, string>([
  ["pinne", "Skycrab"],
  ["blooopy", "Bloopy"],
  ["nohacksjusttiger", "Tiger"],
  ["alladvancements", "Redpill"],
  ["bing_pigs", "Mongey"],
  ["schwarzer_rabe97", "Jason"],
  ["priffie", "Priffin"],
  ["nohacsjustroblox", "Roblox"]
])

export const uuidToIGN = async (uuid: string) => {
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