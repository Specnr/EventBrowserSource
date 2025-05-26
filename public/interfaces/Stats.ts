export interface Stat {
  count: number;
  avg: string;
}

export interface StatsResult {
  error?: boolean;
  nether: Stat;
  bastion: Stat;
  fortress: Stat;
  first_structure: Stat;
  second_structure: Stat;
  first_portal: Stat;
  stronghold: Stat;
  end: Stat;
  finish: Stat;
}