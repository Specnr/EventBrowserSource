export interface SplitStats {
  count: number;
  avgMs: number | null;
}

export interface OverallEventStats {
  runCount: number;
  splits: Record<string, SplitStats & { bestMs: number | null }>;
}

export interface PlayerEventStats {
  nickname: string | null;
  splits: Record<string, SplitStats>;
}

export interface EventStatsResponse {
  players: PlayerEventStats[];
  overall: OverallEventStats;
}
