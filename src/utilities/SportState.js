// This endpoint returns information about the current state for any sport (nfl, nba, lcs, etc).
// GET https://api.sleeper.app/v1/state/<sport>
export async function getSportState(sport = 'nfl') {
  const response = await fetch(`https://api.sleeper.app/v1/state/${sport}`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}
