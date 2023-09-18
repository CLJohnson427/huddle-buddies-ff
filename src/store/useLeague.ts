// Pinia
import { defineStore } from 'pinia';

// Sleeper
import { getLeagueInfo, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo';
import { getLeagueMatchupData } from '@/data/sleeper/leagueMatchups.js';
import { getLeagueRosters } from '@/data/sleeper/leagueRosters.js';
import { getLeagueStandings } from '@/data/sleeper/leagueStandings.js';
import { getLeagueUsers } from '@/data/sleeper/leagueUsers';
import { getLeagueChampion } from '@/data/sleeper/playoffBrackets';
import { getSportState } from '@/data/sleeper/sportState';

// Types
import { League } from '@/data/types/LeagueInterfaces';
import { MatchupData } from '@/data/types/MatchupInterfaces';
import { Rosters } from '@/data/types/RosterInterfaces';
import { SportState } from '@/data/types/SportStateInterfaces';
import { Standings } from '@/data/types/StandingsInterfaces';
import { LeagueManager, Users } from '@/data/types/UserInterfaces';

export const useLeagueStore = defineStore('leagueStore', {
  state: () => ({
    // counter: 0,
    darkTheme: true as boolean,
    league: {} as League,
    leagueChampion: {} as LeagueManager | null,
    leagueId: getMostRecentLeagueInfo('id') as string,
    leagueYear: getMostRecentLeagueInfo('year') as number,
    matchupData: {} as MatchupData,
    rosters: {} as Rosters,
    standings: {} as Standings,
    sport: 'nfl' as string,
    sportState: {} as SportState,
    users: {} as Users
  }),
  getters: {
    // doubleCount: (state) => {
    //   state.counter * 2
    // }
  },
  actions: {
    // reset() {
    //   this.counter = 0;
    // },
    // addOne() {
    //   this.counter++;
    // },
    changeTheme() {
      // Toggle Dark/Light Theme.
      this.darkTheme = !this.darkTheme;
      
      if (this.darkTheme) {
        document.documentElement.classList.add('dark');
      }
      else {
        document.documentElement.classList.remove('dark');
      }
    },
    async getLeagueChampion(leagueId: string | null = null): Promise<void> {
      this.leagueChampion = await getLeagueChampion(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueInfo(leagueId: string | null = null): Promise<void> {
      this.league = await getLeagueInfo(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueRosters(leagueId: string | null = null): Promise<void> {
      this.rosters = await getLeagueRosters(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueStandings(leagueId: string | null = null): Promise<void> {
      this.standings = await getLeagueStandings(leagueId ? leagueId : this.leagueId) as any;
    },
    async getLeagueMatchupData(leagueId: string | null = null, week: number): Promise<void> {
      this.matchupData = await getLeagueMatchupData(leagueId ? leagueId : this.leagueId, week);
    },
    async getLeagueUsers(leagueId: string | null = null): Promise<void> {
      this.users = await getLeagueUsers(leagueId ? leagueId : this.leagueId);
    },
    async getSportState(sport: string | null = null): Promise<void> {
      this.sportState = await getSportState(sport ? sport : this.sport);
    }
  }
});
