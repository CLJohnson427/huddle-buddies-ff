// Pinia
import { defineStore } from 'pinia';

// Sleeper
import { getLeagueInfo, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo';
import { getLeagueMatchupData } from '@/data/sleeper/leagueMatchups.js';
import { getLeagueRosters } from '@/data/sleeper/leagueRosters.js';
import { getLeagueStandings } from '@/data/sleeper/leagueStandings.js';
import { getSportState } from '@/data/sleeper/sportState';
import { getLeagueUsers } from '@/data/sleeper/leagueUsers';

// Types
import { League } from '@/data/types/LeagueInterfaces';
import { MatchupData } from '@/data/types/MatchupInterfaces';
import { Rosters } from '@/data/types/RosterInterfaces';
import { SportState } from '@/data/types/SportStateInterfaces';
import { Standings } from '@/data/types/StandingsInterfaces';
import { Users } from '@/data/types/UserInterfaces';

export const useLeagueStore = defineStore('leagueStore', {
  state: () => ({
    // counter: 0,
    darkTheme: true as boolean,
    league: {} as League,
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
    async getLeagueInfo(leagueId = null) {
      this.league = await getLeagueInfo(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueRosters(leagueId = null) {
      this.rosters = await getLeagueRosters(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueStandings(leagueId = null) {
      this.standings = await getLeagueStandings(leagueId ? leagueId : this.leagueId) as any;
    },
    async getLeagueMatchupData(leagueId: string | null = null, week: number) {
      this.matchupData = await getLeagueMatchupData(leagueId ? leagueId : this.leagueId, week);
    },
    async getLeagueUsers(leagueId = null) {
      this.users = await getLeagueUsers(leagueId ? leagueId : this.leagueId);
    },
    async getSportState(sport = null) {
      this.sportState = await getSportState(sport ? sport : this.sport);
    }
  }
});
