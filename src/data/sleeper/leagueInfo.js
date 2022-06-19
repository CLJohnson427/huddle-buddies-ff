import { useLeagueStore } from '@/store/useLeague'

export const leagueIds = [
  // Keep the most current year as the 0 index.
  { year: 2021, leagueId: '651495359322963968' },
  { year: 2020, leagueId: '529745461166530560' },
  { year: 2019, leagueId: '383723052850278400' },
  { year: 2018, leagueId: '300327253869363200' }
]

// GET https://api.sleeper.app/v1/league/<league_id>
export async function getLeagueInfo(leagueId) {
  const leagueStore = useLeagueStore();

  if (leagueStore.league.league_id === leagueId) {
    return leagueStore.league;
  }
  
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`).catch((error) => { console.error(error); });
  const data = await response.json().catch((error) => { console.error(error); });

  if (response.ok) {
    leagueStore.$patch((state) => (state.league = data));
    return data;
  }
  else {
    throw new Error(data);
  }
}
