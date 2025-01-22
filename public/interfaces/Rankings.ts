export interface Completion {
  time: number;
  points: number;
}

export interface PlayerRanking {
  uuid: string;
  nickname: string;
  totalPoints: number;
  completions: Completion[]
}

export interface Event {
  name: string;
  starts: number[];
  ends: number[];
  whitelist: string[];
  vanity: string;
  host: string;
}

export interface Result {
  event: Event;
  rankings: PlayerRanking[]
}