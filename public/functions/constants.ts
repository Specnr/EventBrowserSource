export const GET_EVENT_DATA_URL = (event: string) => `https://paceman.gg/api/cs/event?vanity=${event}`

export const GET_INTERNAL_STATS_URL = (vanity: string) => `/api/stats?vanity=${encodeURIComponent(vanity)}`

export const GET_EVENT_STATS_URL = (vanity: string) => `https://paceman.gg/stats/api/getEventStats/?vanity=${encodeURIComponent(vanity)}`
