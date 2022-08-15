import { TeamRoster } from '@/data/types/RosterInterfaces';
import { LeagueManager } from '@/data/types/UserInterfaces';

/**********************************************************
  Custom Interfaces
/*********************************************************/
export interface WeeklyStanding {
  medianLosses: number;
  medianTies: number;
  medianWins: number;
  playerLosses: number;
  playerTies: number;
  playerWins: number;
  pointsAgainst: number;
  pointsFor: number;
  totalLosses: number;
  totalTies: number;
  totalWins: number;
  week: number;
}

export interface TeamStanding {
  divisionWins: number;
  divisionLosses: number;
  divisionTies: number;
  manager: LeagueManager;
  medianWins: number;
  medianLosses: number;
  medianTies: number;
  playerWins: number;
  playerLosses: number;
  playerTies: number;
  rosterId: number;
  totalWins: number;
  totalLosses: number;
  totalTies: number;
  totalPointsFor: number;
  totalPointsAgainst: number;
  weeklyStandings: WeeklyStanding[];
}

export interface Standings {
  league_id: string;
  medianMatch: boolean;
  roster: Map<number, TeamRoster>;
  seasonYear: string | number;
  standings: Map<number, TeamStanding>;
}
