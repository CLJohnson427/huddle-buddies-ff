import { getLeagueInfo } from "./leagueInfo.js";
import { getRawLeagueMatchupData } from "./leagueMatchups.js";
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
  let matchupData = await getRawLeagueMatchupData(leagueId, week);

  // Process Standings data from the season matchups.
  let standings = {};
  for (let [weekIndex, matchup] of matchupData.entries()) {
    standings = await processStandingsData(leagueId, matchup.value, standings, leagueRosters.value, leagueUsers.value, medianMatch, weekIndex + 1);
  }

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

async function processStandingsData(leagueId, matchup, standingsData, leagueRosters, leagueUsers, medianMatch, week) {
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
        divisionWins: leagueRosters.rosters[rosterId - 1].settings.division ? 0 : null,
        divisionLosses: leagueRosters.rosters[rosterId - 1].settings.division ? 0 : null,
        divisionTies: leagueRosters.rosters[rosterId - 1].settings.division ? 0 : null,
        medianWins: medianMatch ? 0 : null,
        medianLosses: medianMatch ? 0 : null,
        medianTies: medianMatch ? 0 : null,
        playerWins: 0,
        playerLosses: 0,
        playerTies: 0,
        totalWins: 0,
        totalLosses: 0,
        totalTies: 0,
        weeklyStandings: []
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
          standingsData[matchups[matchupKey][i].rosterId].medianWins++;
          standingsData[matchups[matchupKey][i].rosterId].totalWins++;
        }
        else if (matchups[matchupKey][i].points < medianScore) {
          standingsData[matchups[matchupKey][i].rosterId].medianLosses++;
          standingsData[matchups[matchupKey][i].rosterId].totalLosses++;
        }
        else if (matchups[matchupKey][i].points === medianScore) {
          standingsData[matchups[matchupKey][i].rosterId].medianTies++;
          standingsData[matchups[matchupKey][i].rosterId].totalTies++;
        }
      }
    }

    // Head to Head Matchup
    if (teamA.points > teamB.points) {
      standingsData[teamA.rosterId].playerWins++;
      standingsData[teamA.rosterId].totalWins++;
      standingsData[teamB.rosterId].playerLosses++;
      standingsData[teamB.rosterId].totalLosses++;
      if (divisionMatchup) {
        standingsData[teamA.rosterId].divisionWins++;
        standingsData[teamB.rosterId].divisionLosses++;
      }
    }
    else if (teamB.points > teamA.points) {
      standingsData[teamB.rosterId].playerWins++;
      standingsData[teamB.rosterId].totalWins++;
      standingsData[teamA.rosterId].playerLosses++;
      standingsData[teamA.rosterId].totalLosses++;
      if (divisionMatchup) {
        standingsData[teamB.rosterId].divisionWins++;
        standingsData[teamA.rosterId].divisionLosses++;
      }
    }
    else if (teamA.points === teamB.points) {
      standingsData[teamA.rosterId].playerTies++;
      standingsData[teamA.rosterId].totalTies++;
      standingsData[teamB.rosterId].playerTies++;
      standingsData[teamB.rosterId].totalTies++;
      if (divisionMatchup) {
        standingsData[teamA.rosterId].divisionTies++;
        standingsData[teamB.rosterId].divisionTies++;
      }
    }

    // Weekly Standings
    standingsData[teamA.rosterId].weeklyStandings.push({
      week: week,
      medianWins: standingsData[teamA.rosterId].medianWins,
      medianLosses: standingsData[teamA.rosterId].medianLosses,
      medianTies: standingsData[teamA.rosterId].medianTies,
      playerWins: standingsData[teamA.rosterId].playerWins,
      playerLosses: standingsData[teamA.rosterId].playerLosses,
      playerTies: standingsData[teamA.rosterId].playerTies,
      totalWins: standingsData[teamA.rosterId].totalWins,
      totalLosses: standingsData[teamA.rosterId].totalLosses,
      totalTies: standingsData[teamA.rosterId].totalTies
    });
    
    standingsData[teamB.rosterId].weeklyStandings.push({
      week: week,
      medianWins: standingsData[teamB.rosterId].medianWins,
      medianLosses: standingsData[teamB.rosterId].medianLosses,
      medianTies: standingsData[teamB.rosterId].medianTies,
      playerWins: standingsData[teamB.rosterId].playerWins,
      playerLosses: standingsData[teamB.rosterId].playerLosses,
      playerTies: standingsData[teamB.rosterId].playerTies,
      totalWins: standingsData[teamB.rosterId].totalWins,
      totalLosses: standingsData[teamB.rosterId].totalLosses,
      totalTies: standingsData[teamB.rosterId].totalTies
    });
  }

  return standingsData;
}
