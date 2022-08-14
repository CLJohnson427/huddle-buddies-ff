import { useLeagueStore } from '@/store/useLeague'
import { League, LeagueId } from '@/data/types/LeagueInterfaces';

export const leagueIds: Array<LeagueId> = [
  // Keep the most current year as the 0 index.
  // { year: 2022, leagueId: '807045536300580864' },
  { year: 2021 as number, leagueId: '651495359322963968' as string },
  { year: 2020 as number, leagueId: '529745461166530560' as string },
  { year: 2019 as number, leagueId: '383723052850278400' as string },
  { year: 2018 as number, leagueId: '300327253869363200' as string }
]

export function getMostRecentLeagueInfo(attribute: null | string = null): string | number {
  const mostRecentLeague: LeagueId = leagueIds.reduce((prev, current) => (prev.year > current.year) ? prev : current);
  if (attribute === 'id') {
    return mostRecentLeague.leagueId;
  }
  else if (attribute === 'year') {
    return mostRecentLeague.year;
  }
  else {
    return '';
  }
}

// GET https://api.sleeper.app/v1/league/<league_id>
export async function getLeagueInfo(leagueId: string): Promise<League> {
  const leagueStore = useLeagueStore();

  if (leagueStore.league?.league_id === leagueId) {
    return leagueStore.league;
  }
  
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`).catch((error) => { console.error(error); });
  const data: League = await response?.json().catch((error) => { console.error(error); });

  if (response?.ok) {
    leagueStore.$patch((state) => (state.league = data));
    return data;
  }
  else {
    throw new Error(JSON.stringify(data))
  }
}
