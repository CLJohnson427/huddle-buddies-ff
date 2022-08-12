import { useLeagueStore } from '@/store/useLeague';
import { getLeagueManagerDisplay } from '@/data/sleeper/leagueUsers';

// This endpoint retrieves all rosters in a league.
// GET https://api.sleeper.app/v1/league/<leagueId>/rosters
export async function getLeagueRosters(leagueId) {
  const leagueStore = useLeagueStore();

  if (leagueStore.rosters.league_id === leagueId) {
    return leagueStore.rosters;
  }

  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.error(error); });
  const data = await response.json().catch((error) => { console.error(error); });

  if (response.ok) {
    const rosterData = await processRosters(data)
    leagueStore.$patch((state) => (state.rosters = rosterData));
    return rosterData;
  }
  else {
    throw new Error(data);
  }
}

// // This endpoint retrieves the roster data baed on the leagueId and ownerId.
// // GET https://api.sleeper.app/v1/league/<leagueId>/rosters
// export async function getOwnerRosterInLeague(leagueId, ownerId) {
//   const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.error(error); });
//   const data = await response.json().catch((error) => { console.error(error); });

//   if (response.ok) {
//     let ownerRoser = data.find((roster) => { return roster.owner_id == ownerId });

//     return ownerRoser;
//   }
//   else {
//     throw new Error(data);
//   }
// }

async function processRosters(rosters) {
  try {
    let leagueId = '';
    const startersAndInjuredReserve = [];
    for (const roster of rosters) {
      leagueId = roster.league_id;

      for (const starter of roster.starters) {
        startersAndInjuredReserve.push(starter);
      }
  
      if (roster.reserve) {
        for (const injuredReserve of roster.reserve) {
          startersAndInjuredReserve.push(injuredReserve);
        }
      }
      
      roster.manager = await getLeagueManagerDisplay(roster.league_id, roster.owner_id);
    }
  
    return { league_id: leagueId, rosters: rosters, startersAndInjuredReserve: startersAndInjuredReserve };
  }
  catch (error) {
    console.error(error);
  }
}
