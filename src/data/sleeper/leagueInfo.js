import { useLeagueStore } from '@/store/useLeague'

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
