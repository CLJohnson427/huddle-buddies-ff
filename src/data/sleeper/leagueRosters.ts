import { useLeagueStore } from '@/store/useLeague';
import { getLeagueManagerDisplay } from '@/data/sleeper/leagueUsers';
import { Roster, Rosters, TeamRoster } from '@/data/types/RosterInterfaces'

// This endpoint retrieves all rosters in a league.
// GET https://api.sleeper.app/v1/league/<leagueId>/rosters
export async function getLeagueRosters(leagueId): Promise<Rosters> {
  const leagueStore = useLeagueStore();

  if (leagueStore.rosters.league_id === leagueId) {
    return leagueStore.rosters;
  }

  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.error(error); });
  const data: Array<Roster> = await response?.json().catch((error) => { console.error(error); });

  if (response?.ok) {
    const rosterData = await processRosters(data) as Rosters;
    leagueStore.$patch((state) => (state.rosters = rosterData));
    return rosterData;
  }
  else {
    throw new Error(JSON.stringify(data))
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

async function processRosters(rosters: Array<Roster>): Promise<Rosters | undefined> {
  try {
    let leagueId = '';
    const mapRosters = new Map<number, Roster>();
    const startersAndInjuredReserve = [] as Array<string>;
    for (const roster of rosters) {
      // League Data
      leagueId = roster.league_id;

      // Team Roster Data
      const teamRoster = roster as TeamRoster;
      teamRoster.manager = await getLeagueManagerDisplay(roster.league_id, roster.owner_id);
      mapRosters.set(teamRoster.roster_id, teamRoster);

      // Starters & Injured Reserve Data
      for (const starter of teamRoster.starters) {
        startersAndInjuredReserve.push(starter);
      }
  
      if (teamRoster.reserve) {
        for (const injuredReserve of teamRoster.reserve) {
          startersAndInjuredReserve.push(injuredReserve);
        }
      }
    }
  
    return {
      league_id: leagueId,
      roster: mapRosters,
      startersAndInjuredReserve: startersAndInjuredReserve
    } as Rosters;
  }
  catch (error) {
    console.error(error);
  }
}
