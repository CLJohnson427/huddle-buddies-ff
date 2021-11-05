// This endpoint retrieves data for a specific user.
// GET https://api.sleeper.app/v1/user/<username>
export async function getUserByUsername(username) {
  const response = await fetch(`https://api.sleeper.app/v1/user/${username}`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}

// This endpoint retrieves data for a specific user.
// GET https://api.sleeper.app/v1/user/<user_id>
export async function getUserByUserId(userId) {
  const response = await fetch(`https://api.sleeper.app/v1/user/${userId}`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}

// This endpoint retrieves all leagues for a user.
// GET https://api.sleeper.app/v1/user/<user_id>/leagues/<sport>/<season>
export async function getAllLeaguesForUser(userId, sport, season) {
  const response = await fetch(`https://api.sleeper.app/v1/user/${userId}/leagues/${sport}/${season}`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}
