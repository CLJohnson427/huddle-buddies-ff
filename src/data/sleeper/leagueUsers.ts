import { useLeagueStore } from '@/store/useLeague';
import { LeagueManager, User, Users } from '@/data/types/UserInterfaces';

// This endpoint retrieves all users in a league.
// GET https://api.sleeper.app/v1/league/<league_id>/users
export async function getLeagueUsers(leagueId: string): Promise<Users> {
  const leagueStore = useLeagueStore();

  if (leagueStore.users?.league_id === leagueId) {
    return leagueStore.users;
  }

  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).catch((error) => { console.error(error) });
  const data: Array<User> = await response?.json().catch((error) => { console.error(error) });

  if (response?.ok) {
    const userData = processUsers(data) as Users;
    leagueStore.$patch((state) => (state.users = userData));
    return userData;
  }
  else {
    throw new Error(JSON.stringify(data));
  }
}

function processUsers(users: User[]): Users | undefined {
  try {
    let leagueId = '';
    const mapUsers = new Map<string, User>();
    for (const user of users) {
      leagueId = user.league_id;
      mapUsers.set(user.user_id, user);
    }
    
    return { league_id: leagueId, user: mapUsers } as Users;
  }
  catch (error) {
    console.error(error);
  }
}

export async function getLeagueManagerDisplay(leagueId: string, userId: string): Promise<LeagueManager> {
  const leagueStore = useLeagueStore();

  let user: User | null = null;
  let manager: LeagueManager;

  if (leagueStore.users?.user?.has(userId)) {
    user = leagueStore.users.user.get(userId) as User;
  }
  else {
    const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).catch((error) => { console.error(error) });
    const data: Array<User> = await response?.json().catch((error) => { console.error(error) });
  
    if (response?.ok) {
      const userData = processUsers(data) as Users;
      user = userData.user.get(userId) as User;
    }
    else {
      throw new Error(JSON.stringify(data));
    }
  }

  if (user) { 
    manager = {
      avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
      managerName: user.display_name,
      teamName: user.metadata.team_name,
      userId: user.user_id
    };
  }
  else {
    manager = {
      avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
      managerName: 'Unknown Manager',
      teamName: 'Unknown Team',
      userId: '0'
    };
  }

  return manager;
}
