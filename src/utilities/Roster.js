// This endpoint retrieves all rosters in a league.
// GET https://api.sleeper.app/v1/league/<leagueId>/rosters
export async function getRostersInLeague(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}


// This endpoint retrieves the roster data baed on the leagueId and ownerId.
// GET https://api.sleeper.app/v1/league/<leagueId>/rosters
export async function getOwnerRosterInLeague(leagueId, ownerId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    let ownerRoser = data.find((roster) => { return roster.owner_id == ownerId });

    return ownerRoser;
  }
  else {
    throw new Error(data);
  }
}