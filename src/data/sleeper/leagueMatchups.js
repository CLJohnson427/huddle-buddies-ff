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
