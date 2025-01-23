export const GET_EVENT_DATA_URL = (eventId: string) => `https://paceman.gg/api/cs/event?id=${eventId}`

export const GET_INTERNAL_STATS_URL = (players: string[], start: number) => `/api/stats?names=${players.join(",")}&start=${start}`

export const GET_STATS_URL = (player: string, startTime: number) => `https://paceman.gg/stats/api/getCombinedStats?names=${player}&start=${startTime}`