/*
import type { League } from '@/interfaces/LeagueInterfaces'
import type { MatchupData } from '@/interfaces/MatchupInterfaces'
import type { Rosters } from '@/interfaces/RosterInterfaces'
import type { SportState } from '@/interfaces/SportStateInterfaces'
import type { Standings } from '@/interfaces/StandingsInterfaces'
import type { LeagueManager, Users } from '@/interfaces/UserInterfaces'
import { getLeagueInfo, getMostRecentLeagueInfo } from '@/utils/sleeper/leagueInfo'
import { getLeagueMatchupData } from '@/utils/sleeper/leagueMatchups.js'
import { getLeagueRosters } from '@/utils/sleeper/leagueRosters.js'
import { getLeagueStandings } from '@/utils/sleeper/leagueStandings.js'
import { getLeagueUsers } from '@/utils/sleeper/leagueUsers'
import { getLeagueChampion } from '@/utils/sleeper/playoffBrackets'
import { getSportState } from '@/utils/sleeper/sportState'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLeagueStore = defineStore('leagueStore', () => {
  const darkTheme = ref<boolean>(true)
  const league = ref<League>()
  const leagueChampion = ref<LeagueManager | null>()
  const leagueId = ref<string>(getMostRecentLeagueInfo('id') as string)
  const leagueYear = ref<number>(getMostRecentLeagueInfo('year') as number)
  const matchupData = ref<MatchupData>()
  const rosters = ref<Rosters>()
  const standings = ref<Standings>()
  const sport = ref<string>('nfl')
  const sportState = ref<SportState>()
  const users = ref<Users>()

  // function changeTheme() {
  //   // Toggle Dark/Light Theme.
  //   darkTheme.value = !darkTheme.value
    
  //   if (darkTheme.value) {
  //     document.documentElement.dataset.theme = 'dark'
  //   }
  //   else {
  //     document.documentElement.dataset.theme = 'light'
  //   }
  // }

  const methods = {
    changeTheme() {
      // Toggle Dark/Light Theme.
      darkTheme.value = !darkTheme.value
      
      if (darkTheme.value) {
        document.documentElement.dataset.theme = 'dark'
      }
      else {
        document.documentElement.dataset.theme = 'light'
      }
    },
    // async getLeagueChampion(leagueId2: string | null = null): Promise<void> {
    //   leagueChampion.value = await getLeagueChampion(leagueId2 ? leagueId2 : leagueId.value)
    // },
    // async getLeagueInfo(leagueId: string | null = null): Promise<void> {
    //   this.league = await getLeagueInfo(leagueId ? leagueId : this.leagueId)
    // },
    // async getLeagueRosters(leagueId: string | null = null): Promise<void> {
    //   this.rosters = await getLeagueRosters(leagueId ? leagueId : this.leagueId)
    // },
    // async getLeagueStandings(leagueId: string | null = null): Promise<void> {
    //   this.standings = await getLeagueStandings(leagueId ? leagueId : this.leagueId) as any
    // },
    // async getLeagueMatchupData(leagueId: string | null = null, week: number): Promise<void> {
    //   this.matchupData = await getLeagueMatchupData(leagueId ? leagueId : this.leagueId, week)
    // },
    // async getLeagueUsers(leagueId: string | null = null): Promise<void> {
    //   this.users = await getLeagueUsers(leagueId ? leagueId : this.leagueId)
    // },
    // async getSportState(sport: string | null = null): Promise<void> {
    //   this.sportState = await getSportState(sport ? sport : this.sport)
    // }
  }
  

  // async function getLeagueChampion2(leagueId: string | null = null): Promise<void> {
  //   leagueChampion.value = await getLeagueChampion(this.leagueId ? this.leagueId : leagueId.value)
  // }
  // async function getLeagueInfo(leagueId: string | null = null): Promise<void> {
  //   this.league = await getLeagueInfo(leagueId ? leagueId : this.leagueId)
  // }
  // async function getLeagueRosters(leagueId: string | null = null): Promise<void> {
  //   this.rosters = await getLeagueRosters(leagueId ? leagueId : this.leagueId)
  // }
  // async function getLeagueStandings(leagueId: string | null = null): Promise<void> {
  //   this.standings = await getLeagueStandings(leagueId ? leagueId : this.leagueId) as any
  // }
  // async function getLeagueMatchupData(leagueId: string | null = null, week: number): Promise<void> {
  //   this.matchupData = await getLeagueMatchupData(leagueId ? leagueId : this.leagueId, week)
  // }
  // async function getLeagueUsers(leagueId: string | null = null): Promise<void> {
  //   this.users = await getLeagueUsers(leagueId ? leagueId : this.leagueId)
  // }
  // async function getSportState(sport: string | null = null): Promise<void> {
  //   this.sportState = await getSportState(sport ? sport : this.sport)
  // }



  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return {
    darkTheme,
    league,
    leagueChampion,
    leagueId,
    leagueYear,
    matchupData,
    rosters,
    standings,
    sport,
    sportState,
    users,
    // changeTheme,
    ...methods,
    
    count,
    doubleCount,
    increment }
})
//*/

// let test = 5
// const test2 = 'sdfsf'
// let test3 = 'sdfsf'

// if (test === 8 || test === 132541351.351651 || test === 13215.65132165 && test2) {
//   test = 6
//   test3 = '1235'
// }

//*
// Pinia
import { defineStore } from 'pinia'

// Sleeper
import { getLeagueInfo, getMostRecentLeagueInfo } from '@/utils/sleeper/leagueInfo'
import { getLeagueMatchupData } from '@/utils/sleeper/leagueMatchups.js'
import { getLeagueRosters } from '@/utils/sleeper/leagueRosters.js'
import { getLeagueStandings } from '@/utils/sleeper/leagueStandings.js'
import { getLeagueUsers } from '@/utils/sleeper/leagueUsers'
import { getLeagueChampion } from '@/utils/sleeper/playoffBrackets'
import { getSportState } from '@/utils/sleeper/sportState'

// Types
import type { League } from '@/interfaces/LeagueInterfaces'
import type { MatchupData } from '@/interfaces/MatchupInterfaces'
import type { Rosters } from '@/interfaces/RosterInterfaces'
import type { SportState } from '@/interfaces/SportStateInterfaces'
import type { Standings } from '@/interfaces/StandingsInterfaces'
import type { LeagueManager, Users } from '@/interfaces/UserInterfaces'

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
    users: {} as Users,
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
      this.darkTheme = !this.darkTheme

      if (this.darkTheme) {
        document.documentElement.classList.add('dark')
        document.documentElement.dataset.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.dataset.theme = 'light'
      }
    },
    async getLeagueChampion(leagueId: string | null = null): Promise<void> {
      this.leagueChampion = await getLeagueChampion(leagueId ? leagueId : this.leagueId)
    },
    async getLeagueInfo(leagueId: string | null = null): Promise<void> {
      this.league = await getLeagueInfo(leagueId ? leagueId : this.leagueId)
    },
    async getLeagueRosters(leagueId: string | null = null): Promise<void> {
      this.rosters = await getLeagueRosters(leagueId ? leagueId : this.leagueId)
    },
    async getLeagueStandings(leagueId: string | null = null): Promise<void> {
      this.standings = (await getLeagueStandings(leagueId ? leagueId : this.leagueId)) as any
    },
    async getLeagueMatchupData(leagueId: string | null = null, week: number): Promise<void> {
      this.matchupData = await getLeagueMatchupData(leagueId ? leagueId : this.leagueId, week)
    },
    async getLeagueUsers(leagueId: string | null = null): Promise<void> {
      this.users = await getLeagueUsers(leagueId ? leagueId : this.leagueId)
    },
    async getSportState(sport: string | null = null): Promise<void> {
      this.sportState = await getSportState(sport ? sport : this.sport)
    },
  },
})
//*/
