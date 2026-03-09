// Pinia
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Sleeper
import { getMostRecentLeagueInfo } from '@/utils/sleeper/leagueInfo'
// import { getLeagueInfo, getMostRecentLeagueInfo } from '@/utils/sleeper/leagueInfo'
// import { getLeagueMatchupData } from '@/utils/sleeper/leagueMatchups'
// import { getLeagueRosters } from '@/utils/sleeper/leagueRosters'
// import { getLeagueStandings } from '@/utils/sleeper/leagueStandings'
// import { getLeagueUsers } from '@/utils/sleeper/leagueUsers'
// import { getLeagueChampion } from '@/utils/sleeper/playoffBrackets'
// import { getSportState } from '@/utils/sleeper/sportState'

// Types
import type { League } from '@/interfaces/LeagueInterfaces'
import type { MatchupData } from '@/interfaces/MatchupInterfaces'
import type { Rosters } from '@/interfaces/RosterInterfaces'
import type { SportState } from '@/interfaces/SportStateInterfaces'
import type { Standings } from '@/interfaces/StandingsInterfaces'
import type { LeagueManager, Users } from '@/interfaces/UserInterfaces'

export const useLeagueStore = defineStore('leagueStore', () => {
  // TODO: Update code so the initial type doesn't have to be an empty object {} pretending to be the type.
  const darkTheme = ref<boolean>(true)
  const league = ref<League | null | undefined>({} as League)
  const leagueChampion = ref<LeagueManager | null | undefined>({} as LeagueManager)
  const leagueId = ref<number | string>(getMostRecentLeagueInfo('id'))
  const leagueYear = ref<number | string>(getMostRecentLeagueInfo('year'))
  const matchupData = ref<MatchupData | null | undefined>({} as MatchupData)
  const rosters = ref<Rosters | null | undefined>({} as Rosters)
  const standings = ref<Standings | null | undefined>({} as Standings)
  const sport = ref<string>('nfl')
  const sportState = ref<SportState | null | undefined>({} as SportState)
  const users = ref<Users | null | undefined>({} as Users)

  function changeTheme() {
    // Toggle Dark/Light Theme.
    darkTheme.value = !darkTheme.value

    if (darkTheme.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.dataset.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.dataset.theme = 'light'
    }
  }

  // async function getLeagueChampion2(leagueId: string | null = null): Promise<void> {
  //   leagueChampion.value = await getLeagueChampion(leagueId ? leagueId : this.leagueId)
  // }
  // async function getLeagueInfo(leagueId: string | null = null): Promise<void> {
  //   league.value = await getLeagueInfo(leagueId ? leagueId : this.leagueId)
  // }
  // async function getLeagueRosters(leagueId: string | null = null): Promise<void> {
  //   rosters.value = await getLeagueRosters(leagueId ? leagueId : this.leagueId)
  // }
  // async function getLeagueStandings(leagueId: string | null = null): Promise<void> {
  //   standings.value = (await getLeagueStandings(leagueId ? leagueId : this.leagueId)) as any
  // }
  // async function getLeagueMatchupData(leagueId: string | null = null, week: number): Promise<void> {
  //   matchupData.value = await getLeagueMatchupData(leagueId ? leagueId : this.leagueId, week)
  // }
  // async function getLeagueUsers(leagueId: string | null = null): Promise<void> {
  //   users.value = await getLeagueUsers(leagueId ? leagueId : this.leagueId)
  // }
  // async function getSportState(sport: string | null = null): Promise<void> {
  //   sportState.value = await getSportState(sport ? sport : this.sport)
  // }

  // Example Code
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment,
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
    changeTheme,
  }
})
