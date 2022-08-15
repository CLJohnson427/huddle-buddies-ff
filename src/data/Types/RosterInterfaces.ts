import { LeagueManager } from '@/data/types/UserInterfaces';

/**********************************************************
  Sleeper API Interfaces
/*********************************************************/
export interface RosterSettings {
  division: number;
  fpts: number;
  fpts_decimal: number;
  fpts_against: number;
  fpts_against_decimal: number;
  losses: number;
  ppts: number;
  ppts_decimal: number;
  ties: number;
  total_moves: number;
  waiver_budget_used: number;
  waiver_position: number;
  wins: number;
}

export interface RosterMetadata {
  allow_pn_news: string;
  allow_pn_scoring: string;
  league_avatar: string;
  league_description: string;
  league_name: string;
  record: string;
}

export interface Roster {
  co_owners?: any;
  league_id: string;
  metadata: RosterMetadata;
  owner_id: string;
  player_map?: any;
  players: string[];
  reserve: string[];
  roster_id: number;
  settings: RosterSettings;
  starters: string[];
  taxi: string[];
}

export interface TeamRoster extends Roster {
  manager: LeagueManager
}

/**********************************************************
  Custom Interfaces
/*********************************************************/
export interface Rosters {
  league_id: string;
  roster: Map<number, TeamRoster>;
  startersAndInjuredReserve: Array<string>
}
