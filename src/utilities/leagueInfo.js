// GET https://api.sleeper.app/v1/league/<league_id>
export async function getLeagueInfo(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`).catch((error) => { console.error(error); });
  const data = await response.json().catch((error) => { console.error(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}

// GET https://api.sleeper.app/v1/league/<league_id>
export async function getLeague(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}

// This endpoint retrieves all rosters in a league.
// GET https://api.sleeper.app/v1/league/<league_id>/rosters
export async function getLeagueRosters(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}

// This endpoint retrieves all users in a league.
// GET https://api.sleeper.app/v1/league/<league_id>/users
export async function getLeagueUsers(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}