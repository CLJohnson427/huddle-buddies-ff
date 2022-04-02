// Pinia
import { defineStore } from 'pinia';

// Sleeper
import { getLeagueInfo } from '@/data/sleeper/leagueInfo.js'
import { getLeagueMatchups } from '@/data/sleeper/leagueMatchups.js'
import { getLeagueRosters } from '@/data/sleeper/leagueRosters.js'
import { getLeagueUsers } from '@/data/sleeper/leagueUsers.js'
import { getSportState } from '@/data/sleeper/sportState.js'

export const useLeagueStore = defineStore('leagueStore', {
  state: () => ({
    // counter: 0,
    league: null,
    leagueId: import.meta.env.VITE_LEAGUE_ID,
    matchups: null,
    rosters: null,
    sport: 'nfl',
    sportState: null,
    users: null
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
    async getLeagueInfo() {
      this.league = await getLeagueInfo(this.leagueId);
    },
    async getLeagueRosters() {
      this.rosters = await getLeagueRosters(this.leagueId);
    },
    async getLeagueMatchups() {
      this.matchups = await getLeagueMatchups(this.leagueId);
    },
    async getLeagueUsers() {
      this.users = await getLeagueUsers(this.leagueId);
    },
    async getSportState() {
      this.sportState = await getSportState(this.sport);
    }
  }
});