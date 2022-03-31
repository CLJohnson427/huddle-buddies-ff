import { createStore } from 'vuex'

import { getLeague, getLeagueUsers } from '@/utilities/League.js';
import { getRostersInLeague } from '@/utilities/Roster.js';
import { getSportState } from '../utilities/SportState';
// import { getOwnerRosterInLeague, getRostersInLeague } from '@/utilities/Roster.js';
import { getUserByUsername } from '@/utilities/User.js';

export default createStore({
  state: {
    //points: 0,
    league: null,
    leagueId: null,
    rosters: null,
    nflState: null,
    user: null,
    users: null
  },
  mutations: {
    // updatePoints(state, payload) {
    //   state.points = state.points + payload
    // },
    setLeague(state, league) {
      state.league = league
      // console.log('league state changed', state.league)
    },
    setLeagueId(state, leagueId) {
      state.leagueId = leagueId
      // console.log('leagueId state changed', state.leagueId)
    },
    setRosters(state, rosters) {
      state.rosters = rosters
    },
    setNflState(state, nflState) {
      state.nflState = nflState
    },
    setUser(state, user) {
      state.user = user
      // console.log('user state changed:', state.user)
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    async getLeague(context, leagueId) {
      console.log('getLeague action')
      const league = await getLeague(leagueId)
      context.commit('setLeague', league)
    },
    async getRosters(context, leagueId) {
      console.log('setRosters action')
      const rosters = await getRostersInLeague(leagueId)
      console.log('getRostersInLeague', rosters)
      context.commit('setRosters', rosters)
    },
    async getNflState(context, sport) {
      console.log('getNflState action')
      const nflState = await getSportState(sport)
      console.log('getSportState', nflState)
      context.commit('setNflState', nflState)
    },
    async getUser(context, username) {
      console.log('getUser action')
      const user = await getUserByUsername(username)
      console.log('getUserByUsername', user)
      context.commit('setUser', user)
    },
    async getUsers(context, leagueId) {
      console.log('getUsers action')
      const users = await getLeagueUsers(leagueId)
      console.log('getLeagueUsers', users)
      context.commit('setUsers', users)
    }
  },
  modules: {
  }
})
