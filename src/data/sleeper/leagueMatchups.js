import { getLeagueInfo } from './leagueInfo.js';
import { getLeagueRosters } from './leagueRosters.js';
import { getLeagueUsers } from './leagueUsers.js';
import { getSportState } from './sportState.js';

export async function getLeagueMatchups(leagueId) {
  // Fetch and resolve necessary League data.
  let [sportState, leagueInfo, leagueRosters, leagueUsers] = await Promise.allSettled([
    getSportState(),
    getLeagueInfo(leagueId),
    getLeagueRosters(leagueId),
    getLeagueUsers(leagueId)
  ]).catch((error) => { console.error(error); });

  // Setup the Season data.
  let seasonYear = leagueInfo.value.season;
  let regularSeasonLength = leagueInfo.value.settings.playoff_week_start - 1;
  let week = 1;
  if (sportState.value.season_type === 'regular') {
    week = sportState.value.display_week;
  }
  else if (sportState.value.season_type === 'post') {
    week = 18;
  }

  // Get Matchup Responses for the entire regular season.
  let matchupPromises = [];
  for (let i = 1; i < leagueInfo.value.settings.playoff_week_start; i++) {
    matchupPromises.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`));
  }
  let matchupsResponses = await Promise.allSettled(matchupPromises).catch((error) => { console.error(error); });

  // Convert the Matchup Responses for the entire regular season into JSON Data.
  let matchupJsonPromises = [];
  for (let matchupResponse of matchupsResponses) {
    let data = matchupResponse.value.json();
    matchupJsonPromises.push(data);
    if (!matchupResponse.value.ok) {
      throw new Error(data);
    }
  }
  let matchupsData = await Promise.allSettled(matchupJsonPromises).catch((error) => { console.error(error); });
  
  // Process all of the Matchup Data into a readable object to return.
  let matchupWeeks = [];
	for (let i = 1; i < matchupsData.length + 1; i++) {
		let processed = processMatchups(matchupsData[i - 1].value, leagueRosters.value.rosters, leagueUsers.value, i);
		if (processed) {
			matchupWeeks.push({
				matchups: processed.matchups,
				week: processed.week
			});
		}
	}

  // Format the response object and return.
  let matchupsResponse = {
    seasonYear,
    regularSeasonLength,
    week,
    matchupWeeks
  };

  return matchupsResponse;
}

function processMatchups(inputMatchups, rosters, users, week) {
  try {
    if (!inputMatchups || inputMatchups.length === 0) {
      return false;
    }

    let matchups = {};
    for (let match of inputMatchups) {
      if (!matchups[match.matchup_id]) {
        matchups[match.matchup_id] = [];
      }
      
      let user = users[rosters[match.roster_id - 1].owner_id];
      if (user) {
        matchups[match.matchup_id].push({
          manager: {
            avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
            managerName: user.display_name,
            teamName: user.metadata.team_name
          },
          points: match.starters_points,
          starters: match.starters,
          // totalPoints: match.starters_points.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0),
          totalPoints: match.points
        });
      }
    }

    return { matchups, week };
  }
  catch (error) {
    console.error(error);
  }
}
