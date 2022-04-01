// This endpoint retrieves all users in a league.
// GET https://api.sleeper.app/v1/league/<league_id>/users
export async function getLeagueUsers(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).catch((error) => { console.error(error); });
  const data = await response.json().catch((error) => { console.error(error); });

  if (response.ok) {
    let userData = processUsers(data);
    return userData;
  }
  else {
    throw new Error(data);
  }
}

function processUsers(users) {
  let processedUsers = {};
  for (let user of users) {
    processedUsers[user.user_id] = user;
  }
  return processedUsers;
}
