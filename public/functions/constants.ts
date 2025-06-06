export const GET_EVENT_DATA_URL = (event: string) => `https://paceman.gg/api/cs/event?vanity=${event}`

export const GET_INTERNAL_STATS_URL = (players: string[], start: number) => `/api/stats?names=${players.join(",")}&start=${start}`

export const GET_STATS_URL = (player: string, startTime: number) => `https://paceman.gg/stats/api/getCombinedStats?names=${player}&start=${startTime}&hours=9999999&hoursBetween=9999999`