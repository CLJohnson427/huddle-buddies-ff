import { getLeagueInfo } from "./leagueInfo.js";
import { getLeagueRosters } from "./leagueRosters.js";
import { getLeagueUsers, getLeagueManagerDisplay } from "./leagueUsers.js";
import { getSportState } from "./sportState.js";
import { useLeagueStore } from "@/store/useLeague";

export async function getLeagueStandings(leagueId) {
  const leagueStore = useLeagueStore();

  if (leagueStore.standings.league_id === leagueId) {
    return leagueStore.standings;
  }

  // Fetch and resolve necessary League data.
  let [leagueInfo, leagueRosters, leagueUsers, sportState] = await Promise.allSettled([
    getLeagueInfo(leagueId),
    getLeagueRosters(leagueId),
    getLeagueUsers(leagueId),
    getSportState(),
  ]).catch((error) => { console.error(error); });

  // Setup the Season data.
  let seasonYear = leagueInfo.value.season;
  let medianMatch = leagueInfo.value.settings.league_average_match == 1;
  let week = leagueInfo.value.settings.start_week;
  if (leagueInfo.value.status === "in_season") {
    week = sportState.value.display_week;
  }
  else if (leagueInfo.value.status === "post_season" || leagueInfo.value.status === "complete") {
    week = leagueInfo.value.settings.playoff_week_start;
  }

  // Cannot retrieve standings if the season hasn't happened or
  // if at least one week of games has occurred.
  if ((leagueInfo.value.status !== "in_season"
      && leagueInfo.value.status !== "post_season"
      && leagueInfo.value.status !== "complete")
      || week < 2
  ) {
    return null;
  }

  // Get all of the matchup data for the completed weeks in the season.
  let matchupPromises = [];
  for (let i = week - 1; i > 0; i--) {
    matchupPromises.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`));
  }
  let matchupsResponses = await Promise.allSettled(matchupPromises).catch((error) => { console.error(error); });

  // Convert the Matchup Responses for the completed weeks in the season into JSON Data.
  let matchupJsonPromises = [];
  for (let matchupResponse of matchupsResponses) {
    let data = matchupResponse.value.json();
    matchupJsonPromises.push(data);
    if (!matchupResponse.value.ok) {
      throw new Error(data);
    }
  }
  let matchupsData = await Promise.allSettled(matchupJsonPromises).catch((error) => { console.error(error); });

  // Process Standings data from the season matchups.
  let standings = {};

  for (let matchup of matchupsData) {
    standings = await processStandingsData(matchup.value, standings, leagueId, leagueRosters.value, leagueUsers.value, medianMatch);
  }
  // for (let [index, matchup] of matchupsData.entries()) {
  //   console.log(index, matchup);
  //   standings = processStandingsData(matchup.value, standings, leagueId, leagueRosters.value, leagueUsers.value, medianMatch);
  // }

  let standingsResponse = {
    league_id: leagueInfo.value.league_id,
    medianMatch: medianMatch,
    roster: leagueRosters.value.rosters,
    seasonYear: seasonYear,
    standings: standings,
  }

  leagueStore.$patch((state) => (state.standings = standingsResponse));

  return standingsResponse;
}

async function processStandingsData(matchup, standingsData, leagueId, leagueRosters, leagueUsers, medianMatch) {
  let matchups = {};
  let scoresArray = [];
  for (let match of matchup) {
    if (!matchups[match.matchup_id]) {
      matchups[match.matchup_id] = [];
    }
    let rosterId = match.roster_id;
    let user = leagueUsers[leagueRosters.rosters[match.roster_id - 1].owner_id];
    let userId = user ? user.user_id : 0
    let manager = await getLeagueManagerDisplay(leagueId, userId);

    // Create the Standings object if it does not already exist for the current roster.
    if (!standingsData[rosterId]) {
      standingsData[rosterId] = {
        manager: manager,
        rosterId: rosterId,
        wins: 0,
        losses: 0,
        ties: 0,
        divisionWins: leagueRosters.rosters[rosterId - 1].settings.division ? 0 : null,
        divisionLosses: leagueRosters.rosters[rosterId - 1].settings.division ? 0 : null,
        divisionTies: leagueRosters.rosters[rosterId - 1].settings.division ? 0 : null,
      }
    }

    matchups[match.matchup_id].push({
      rosterId: rosterId,
      division: leagueRosters.rosters[rosterId - 1].settings.division,
      points: match.points
    });

    if (medianMatch === true) {
      scoresArray.push(match.points);
    }
  }

  // Calculate the Median Score for the Week.
  let medianScore = 0;
  if (medianMatch === true) {
    scoresArray = scoresArray.sort((a, b) => a - b);
    let numberOfManagers = scoresArray.length;
    let middle = Math.floor(numberOfManagers / 2);
    medianScore = numberOfManagers % 2 !== 0 ? scoresArray[middle] : +((scoresArray[middle - 1] + scoresArray[middle]) / 2).toFixed(2);
  }

  for (let matchupKey in matchups) {
    let teamA = matchups[matchupKey][0];
    let teamB = matchups[matchupKey][1];
    let divisionMatchup = teamA.division && teamB.division && teamA.division === teamB.division;

    // Median Matchup
    if (medianMatch === true) {
      for (let i = 0; i < 2; i++) {
        if (matchups[matchupKey][i].points > medianScore) {
          standingsData[matchups[matchupKey][i].rosterId].wins++;
        }
        else if (matchups[matchupKey][i].points < medianScore) {
          standingsData[matchups[matchupKey][i].rosterId].losses++;
        }
        else if (matchups[matchupKey][i].points === medianScore) {
          standingsData[matchups[matchupKey][i].rosterId].ties++;
        }
      }
    }

    // Head to Head Matchup
    if (teamA.points > teamB.points) {
      standingsData[teamA.rosterId].wins++;
      standingsData[teamB.rosterId].losses++;
      if (divisionMatchup) {
        standingsData[teamA.rosterId].divisionWins++;
        standingsData[teamB.rosterId].divisionLosses++;
      }
    }
    else if (teamB.points > teamA.points) {
      standingsData[teamB.rosterId].wins++;
      standingsData[teamA.rosterId].losses++;
      if (divisionMatchup) {
        standingsData[teamB.rosterId].divisionWins++;
        standingsData[teamA.rosterId].divisionLosses++;
      }
    }
    else if (teamA.points === teamB.points) {
      standingsData[teamA.rosterId].ties++;
      standingsData[teamB.rosterId].ties++;
      if (divisionMatchup) {
        standingsData[teamA.rosterId].divisionTies++;
        standingsData[teamB.rosterId].divisionTies++;
      }
    }
  }

  return standingsData;
}
