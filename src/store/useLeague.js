// Pinia
import { defineStore } from 'pinia';

// Sleeper
import { getLeagueInfo, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';
import { getLeagueMatchups } from '@/data/sleeper/leagueMatchups.js';
import { getLeagueRosters } from '@/data/sleeper/leagueRosters.js';
import { getLeagueStandings } from "@/data/sleeper/leagueStandings.js";
import { getLeagueUsers } from '@/data/sleeper/leagueUsers.js';
import { getSportState } from '@/data/sleeper/sportState.js';

export const useLeagueStore = defineStore('leagueStore', {
  state: () => ({
    // counter: 0,
    darkTheme: true,
    league: {},
    leagueId: getMostRecentLeagueInfo('id'),
    leagueYear: getMostRecentLeagueInfo('year'),
    matchups: {},
    rosters: {},
    standings: {},
    sport: 'nfl',
    sportState: {},
    users: {}
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
      this.standings = await getLeagueStandings(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueMatchups(leagueId = null) {
      this.matchups = await getLeagueMatchups(leagueId ? leagueId : this.leagueId);
    },
    async getLeagueUsers(leagueId = null) {
      this.users = await getLeagueUsers(leagueId ? leagueId : this.leagueId);
    },
    async getSportState(sport = null) {
      this.sportState = await getSportState(sport ? sport : this.sport);
    }
  }
});
