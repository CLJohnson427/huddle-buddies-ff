import { useLeagueStore } from '@/store/useLeague'

// This endpoint retrieves all users in a league.
// GET https://api.sleeper.app/v1/league/<league_id>/users
export async function getLeagueUsers(leagueId) {
  const leagueStore = useLeagueStore();

  if (leagueStore.users.league_id === leagueId) {
    return leagueStore.users;
  }

  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).catch((error) => { console.error(error); });
  const data = await response.json().catch((error) => { console.error(error); });

  if (response.ok) {
    let userData = processUsers(data);
    leagueStore.$patch((state) => (state.users = userData));
    return userData;
  }
  else {
    throw new Error(data);
  }
}

function processUsers(users) {
  try {
    let leagueId = '';
    let processedUsers = {};
    for (let user of users) {
      leagueId = user.league_id;
      processedUsers[user.user_id] = user;
    }
    
    return { league_id: leagueId, ...processedUsers };
  }
  catch (error) {
    console.error(error);
  }
}

export async function getLeagueManagerDisplay(leagueId, userId) {
  const leagueStore = useLeagueStore();

  let user = null;
  let manager = {};

  if (leagueStore.users[userId] === userId) {
    user = leagueStore.users[userId];
  }
  else {
    const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).catch((error) => { console.error(error); });
    const data = await response.json().catch((error) => { console.error(error); });
  
    if (response.ok) {
      let userData = processUsers(data);
      user = userData[userId];
    }
    else {
      throw new Error(data);
    }
  }

  if (user) { 
    manager = {
      avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
      managerName: user.display_name,
      teamName: user.metadata.team_name,
      userId: user.user_id
    }
  }
  else {
    manager = {
      avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
      managerName: 'Unknown Manager',
      teamName: 'Unknown Team',
      userId: 0
    }
  }

  return manager;
}