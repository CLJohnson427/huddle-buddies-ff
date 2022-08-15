import { useLeagueStore } from '@/store/useLeague';
import { Matchup, MatchupData } from '@/data/types/MatchupInterfaces';

export async function getLeagueMatchupData(leagueId: string, week: number): Promise<MatchupData> {
  const leagueStore = useLeagueStore();

  if (leagueStore.matchupData?.league_id === leagueId && leagueStore.matchupData?.week === week) {
    return leagueStore.matchupData;
  }

  // Get matchup data for the league up to but NOT including the week passed in.
  const matchupResponses = [] as Promise<Response>[];
  for (let i = 1; i < week; i++) {
    matchupResponses.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`));
  }
  const matchupSettledResults = await Promise.allSettled(matchupResponses).catch((error) => { console.error(error) }) as PromiseSettledResult<Response>[];

  // Convert the Matchup Results for the completed weeks in the season into JSON Data.
  const matchups = [] as Matchup[][];
  for (const matchupResult of matchupSettledResults) {
    if (matchupResult.status === 'fulfilled') {
      const data: Matchup[] = await matchupResult.value.json().catch((error) => { console.error(error) });
      matchups.push(data);
    }
    else {
      throw new Error(matchupResult.reason);
    }
  }

  const matchupData = {
    league_id: leagueId,
    matchups: matchups,
    week: week
  } as MatchupData;

  leagueStore.$patch((state) => (state.matchupData = matchupData));
  
  return matchupData;
}

/*
import { getLeagueInfo } from '@/data/sleeper/leagueInfo';
import { getLeagueRosters } from '@/data/sleeper/leagueRosters';
import { getLeagueUsers, getLeagueManagerDisplay } from '@/data/sleeper/leagueUsers';
import { getSportState } from '@/data/sleeper/sportState';
import { useLeagueStore } from '@/store/useLeague'

export async function getLeagueMatchups(leagueId) {
  const leagueStore = useLeagueStore();
  
  if (leagueStore.matchups.league_id === leagueId) {
    return leagueStore.matchups;
  }

  // Fetch and resolve necessary League data.
  const [leagueInfo, leagueRosters, leagueUsers, sportState] = await Promise.allSettled([
    getLeagueInfo(leagueId),
    getLeagueRosters(leagueId),
    getLeagueUsers(leagueId),
    getSportState()
  ]).catch((error) => { console.error(error); });

  // Setup the Season data.
  const seasonYear = leagueInfo.value.season;
  const regularSeasonLength = leagueInfo.value.settings.playoff_week_start - 1;
  let week = leagueInfo.value.settings.start_week;
  if (sportState.value.season_type === 'regular') {
    week = sportState.value.display_week;
  }
  else if (sportState.value.season_type === 'post') {
    week = leagueInfo.value.settings.playoff_week_start;
  }

  // Get Matchup Responses for the entire regular season.
  const matchupPromises = [];
  for (let i = 1; i < leagueInfo.value.settings.playoff_week_start; i++) {
    matchupPromises.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`));
  }
  const matchupResponses = await Promise.allSettled(matchupPromises).catch((error) => { console.error(error); });

  // Convert the Matchup Responses for the entire regular season into JSON Data.
  const matchupJsonPromises = [];
  for (const matchupResponse of matchupResponses) {
    const data = matchupResponse.value.json();
    matchupJsonPromises.push(data);
    if (!matchupResponse.value.ok) {
      throw new Error(data);
    }
  }
  const matchupData = await Promise.allSettled(matchupJsonPromises).catch((error) => { console.error(error); });
  
  // Process all of the Matchup Data into a readable object to return.
  const weeklyMatchups = [];
	for (let i = 1; i < matchupData.length + 1; i++) {
		const processed = await processMatchupData(leagueId, matchupData[i - 1].value, leagueRosters.value.rosters, leagueUsers.value, i);
		if (processed) {
			weeklyMatchups.push({
				matchups: processed.matchups,
				week: processed.week
			});
		}
	}

  // Format the response object and return.
  const matchupsResponse = {
    league_id: leagueInfo.value.league_id,
    regularSeasonLength,
    seasonYear,
    week,
    weeklyMatchups
  };

  leagueStore.$patch((state) => (state.matchups = matchupsResponse));

  return matchupsResponse;
}

async function processMatchupData(leagueId, matchupData, rosters, users, week) {
  try {
    if (!matchupData || matchupData.length === 0) {
      return false;
    }

    const matchups = {};
    for (const match of matchupData) {
      if (!matchups[match.matchup_id]) {
        matchups[match.matchup_id] = [];
      }

      const user = users[rosters[match.roster_id - 1].owner_id];
      const userId = user ? user.user_id : 0
      const manager = await getLeagueManagerDisplay(leagueId, userId);

      matchups[match.matchup_id].push({
        matchup_id: match.matchup_id,
        manager: manager,
        points: match.starters_points,
        starters: match.starters,
        // totalPoints: match.starters_points.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0),
        totalPoints: match.points
      });
    }

    return { matchups, week };
  }
  catch (error) {
    console.error(error);
  }
}

export async function getRawLeagueMatchupData(leagueId, week) {
  // Get matchup data for the league up to but NOT including the week passed in.
  const matchupPromises = [];
  for (let i = 1; i < week; i++) {
    matchupPromises.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`));
  }
  const matchupResponses = await Promise.allSettled(matchupPromises).catch((error) => { console.error(error); });

  // Convert the Matchup Responses for the completed weeks in the season into JSON Data.
  const matchupJsonPromises = [];
  for (const matchupResponse of matchupResponses) {
    const data = matchupResponse.value.json();
    matchupJsonPromises.push(data);
    if (!matchupResponse.value.ok) {
      throw new Error(data);
    }
  }
  const matchupData = await Promise.allSettled(matchupJsonPromises).catch((error) => { console.error(error); });

  return matchupData;
}

//*/










/* TS Attempt
export async function getLeagueMatchups(leagueId: string): Promise<Matchup> {
  const leagueStore = useLeagueStore();
  
  if (leagueStore.matchups.league_id === leagueId) {
    return leagueStore.matchups;
  }

  const leagueInfo: League = await getLeagueInfo(leagueId);
  const leagueRosters: Rosters = await getLeagueRosters(leagueId);
  const leagueUsers: Users = await getLeagueUsers(leagueId);
  const sportState: SportState = await getSportState();

  // Fetch and resolve necessary League data.
  // const [leagueInfo, leagueRosters, leagueUsers, sportState] = await Promise.allSettled([
  //   getLeagueInfo(leagueId),
  //   getLeagueRosters(leagueId),
  //   getLeagueUsers(leagueId),
  //   getSportState()
  // ]).catch((error) => { console.error(error); });

  console.log('leagueInfo', leagueInfo.season)

  // Setup the Season data.
  const seasonYear = leagueInfo.season;
  const regularSeasonLength = leagueInfo.settings.playoff_week_start - 1;
  let week = leagueInfo.settings.start_week;
  if (sportState.season_type === 'regular') {
    week = sportState.display_week;
  }
  else if (sportState.season_type === 'post') {
    week = leagueInfo.settings.playoff_week_start;
  }

  // Get Matchup Responses for the entire regular season.
  const matchupResponses = [] as Promise<Response>[];
  for (let i = 1; i < leagueInfo.settings.playoff_week_start; i++) {
    matchupResponses.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`));
  }
  const matchupSettledResults = await Promise.allSettled(matchupResponses).catch((error) => { console.error(error); }) as PromiseSettledResult<Response>[];

  // Convert the Matchup Responses for the entire regular season into JSON Data.
  const matchupData = [] as Matchup[];
  for (const matchupResult of matchupSettledResults) {
    if (matchupResult.status === 'fulfilled') {
      const data: Matchup = await matchupResult.value.json().catch((error) => { console.error(error); });
      matchupData.push(data)
    }
    else {
      throw new Error(matchupResult.reason)
    }
  }

  // Process all of the Matchup Data into a readable object to return.
  const weeklyMatchups = [];
	for (let i = 1; i < matchupData.length + 1; i++) {
		const processed = await processMatchupData(leagueId, matchupData, leagueRosters, leagueUsers, i);
    console.log('processed', processed)
		// const processed = await processMatchupData(leagueId, matchupData[i - 1], leagueRosters, leagueUsers, i);
		if (processed) {
			weeklyMatchups.push({
				matchups: processed.matchups,
				week: processed.week
			});
		}
	}

  // Format the response object and return.
  const matchupsResponse = {
    league_id: leagueInfo.league_id,
    regularSeasonLength,
    seasonYear,
    week,
    weeklyMatchups
  };

  leagueStore.$patch((state) => (state.matchups = matchupsResponse));

  return matchupsResponse;
}

async function processMatchupData(leagueId: string, matchupData: Matchup[], leagueRosters: Rosters, leagueUsers: Users, week: number) {
  try {
    if (!matchupData || matchupData.length === 0) {
      return undefined;
    }

    const matchups = {};
    for (const match of matchupData) {
      if (!matchups[match.matchup_id]) {
        matchups[match.matchup_id] = [];
      }

      console.log('match', match)
      // const user = leagueUsers[leagueRosters[match.roster_id - 1].owner_id];
      const roster = leagueRosters.roster.get(match.roster_id) as TeamRoster;
      const user = leagueUsers.user.get(roster.owner_id)
      const userId = user ? user.user_id : '0'
      const manager = await getLeagueManagerDisplay(leagueId, userId);

      matchups[match.matchup_id].push({
        matchup_id: match.matchup_id,
        manager: manager,
        points: match.starters_points,
        starters: match.starters,
        // totalPoints: match.starters_points.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0),
        totalPoints: match.points
      });
    }

    console.log('matchups', matchups)
    return { matchups, week };
  }
  catch (error) {
    console.error(error);
  }
}
//*/
