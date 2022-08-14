/**********************************************************
  Sleeper API Interfaces
/*********************************************************/
export interface PlayersPoints {
  7828: number;
}

export interface Matchup {
  custom_points?: any;
  matchup_id: number;
  players: string[];
  players_points: object;
  points: number;
  roster_id: number;
  starters: string[];
  starters_points: number[];
}

/**********************************************************
  Custom Interfaces
/*********************************************************/
export interface MatchupData {
  league_id: string;
  matchups: Matchup[];
  week: number;
}
