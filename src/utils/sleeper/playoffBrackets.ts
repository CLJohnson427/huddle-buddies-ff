import type { League } from '@/interfaces/LeagueInterfaces'
import type { PlayoffBracket } from '@/interfaces/PlayoffBrackets'
import type { Rosters } from '@/interfaces/RosterInterfaces'
import type { LeagueManager } from '@/interfaces/UserInterfaces'
import { useLeagueStore } from '@/stores/leagueStore'
import { getLeagueInfo } from '@/utils/sleeper/leagueInfo'
import { getLeagueRosters } from '@/utils/sleeper/leagueRosters'
import { getLeagueManagerDisplay } from '@/utils/sleeper/leagueUsers'

// This endpoint retrieves the playoff bracket for a league for 4, 6, and 8 team playoffs.
// Each row represents a matchup between 2 teams.
// GET https://api.sleeper.app/v1/league/<league_id>/winners_bracket
export async function getPlayoffWinnersBrackets(leagueId: string): Promise<PlayoffBracket[]> {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/winners_bracket`).catch((error) => { console.error(error) })
  const data = await response?.json().catch((error) => { console.error(error) })

  if (response?.ok) {
    return data
  }
  else {
    throw new Error(JSON.stringify(data))
  }
}

export async function getLeagueChampion(leagueId: string) {
  const leagueStore = useLeagueStore()
  
  if (leagueStore.leagueChampion?.leagueId === leagueId) {
    return leagueStore.leagueChampion
  }

  // Fetch and resolve necessary League data.
  const playoffWinnersBrackets: PlayoffBracket[] = await getPlayoffWinnersBrackets(leagueId)
  const leagueRosters: Rosters = await getLeagueRosters(leagueId)
  const leagueInfo: League = await getLeagueInfo(leagueId)

  if (leagueInfo.status === 'complete') {
    const playoffRounds: number = playoffWinnersBrackets[playoffWinnersBrackets.length - 1].r
    const championshipMatch = playoffWinnersBrackets.filter((match) => match.r === playoffRounds && match.t1_from.w)[0]
    const championRoster = leagueRosters.roster.get(championshipMatch.w)
    const championUserId = championRoster ? championRoster.owner_id : '0'
    const leagueChampion: LeagueManager = await getLeagueManagerDisplay(leagueId, championUserId)
  
    leagueStore.$patch((state) => (state.leagueChampion = leagueChampion))
    return leagueChampion
  }
  else{ 
    return null
  }
}
