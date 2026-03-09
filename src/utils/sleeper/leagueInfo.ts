import type { League, LeagueId } from '@/interfaces/LeagueInterfaces'
import { useLeagueStore } from '@/stores/leagueStore'

export const leagueIds: Array<LeagueId> = [
  // Keep the most current year as the 0 index.
  { year: 2025, leagueId: '1205001407321616384' },
  { year: 2024, leagueId: '1049732316240723968' },
  { year: 2023, leagueId: '925192539278303232' },
  { year: 2022, leagueId: '807045536300580864' },
  { year: 2021, leagueId: '651495359322963968' },
  { year: 2020, leagueId: '529745461166530560' },
  { year: 2019, leagueId: '383723052850278400' },
  { year: 2018, leagueId: '300327253869363200' },
]

/**
 * Returns information from the most recent league.
 * @param {null | string} attribute - Optional. If `'id'`, returns the league ID.
 *                                    If `'year'`, returns the season year.
 *                                    If null or any other value, returns an empty string.
 * @returns {string | number} The requested league attribute or an empty string if not matched.
 *
 * @example
 * const leagueId = getMostRecentLeagueInfo('id'); // "123456"
 * const leagueYear = getMostRecentLeagueInfo('year'); // 2023
 * const default = getMostRecentLeagueInfo(); // ""
 */
export function getMostRecentLeagueInfo(attribute: null | string = null): string | number {
  const mostRecentLeague: LeagueId = leagueIds.reduce((prev, current) =>
    prev.year > current.year ? prev : current
  )
  if (attribute === 'id') {
    return mostRecentLeague.leagueId
  } else if (attribute === 'year') {
    return mostRecentLeague.year
  } else {
    return ''
  }
}

// GET https://api.sleeper.app/v1/league/<league_id>

/**
 * Fetches detailed information about a Sleeper league by its ID.
 * First checks the local store for cached data to prevent unnecessary API calls.
 * If the cache is invalid or stale, performs an HTTP GET request to Sleeper's
 * API (https://api.sleeper.app/v1/league/<[league_id]>`).
 * Updates the store with fresh data if retrieved successfully.
 *
 * @param {string} leagueId - The unique identifier of the league.
 * @returns {Promise<League>} A Promise that resolves to the league object.
 *                            Throws an error if the fetch fails or the response is not OK.
 *
 * @throws {Error} If the network request fails or the API responds with a non-OK status.
 *
 * @example
 * const league = await getLeagueInfo('758918103151796224');
 * console.log(league.name); // "Sleeper League Name"
 */
export async function getLeagueInfo(leagueId: string): Promise<League> {
  const leagueStore = useLeagueStore()

  if (leagueStore.league?.league_id === leagueId) {
    return leagueStore.league
  }

  try {
    const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Fetch failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data: League = await response.json()
    leagueStore.$patch((state) => (state.league = data))

    return data
  } catch (error) {
    console.error('Failed to fetch league info:', error)
    throw error
  }
}
