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



/* Test async and class methods
export const getLeagueData = async (leagueId) => {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`).catch((error) => { console.log(error) });
  const data = await response.json().catch((error) => { console.log(error) });
  
  //console.log('getLeagueData', data);
  return data;
}

export class League {
  constructor() {
    this.leagueId = '';
  }
  async getLeagueData(leagueId) {
    const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`).catch((error) => { console.log(error); });
    const data = await response.json().catch((error) => { console.log(error); });

    //console.log('League.getLeagueData', data);
    return data;
  }
}

fetch(`https://api.sleeper.app/v1/league/${process.env.VUE_APP_LEAGUE_ID}`)
  .then((response) => response.json())
  .then((data) => {
    console.log('League', data)
    this.league = data
  })
//*/
