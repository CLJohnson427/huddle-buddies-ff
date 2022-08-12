import { getLeagueInfo } from "@/data/sleeper/leagueInfo";
import { getRawLeagueMatchupData } from "@/data/sleeper/leagueMatchups";
import { getLeagueRosters } from "@/data/sleeper/leagueRosters";
import { getLeagueUsers, getLeagueManagerDisplay } from "@/data/sleeper/leagueUsers";
import { getSportState } from "@/data/sleeper/sportState";
import { useLeagueStore } from "@/store/useLeague";

export async function getLeagueStandings(leagueId) {
  const leagueStore = useLeagueStore();

  if (leagueStore.standings.league_id === leagueId) {
    return leagueStore.standings;
  }

  // Fetch and resolve necessary League data.
  const [leagueInfo, leagueRosters, leagueUsers, sportState] = await Promise.allSettled([
    getLeagueInfo(leagueId),
    getLeagueRosters(leagueId),
    getLeagueUsers(leagueId),
    getSportState(),
  ]).catch((error) => { console.error(error); });

  // Setup the Season data.
  const seasonYear = leagueInfo.value.season;
  const medianMatch = leagueInfo.value.settings.league_average_match == 1;
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
  const matchupData = await getRawLeagueMatchupData(leagueId, week);

  // Process Standings data from the season matchups.
  let standings = {};
  for (const [weekIndex, matchup] of matchupData.entries()) {
    standings = await processStandingsData(leagueId, matchup.value, standings, leagueRosters.value, leagueUsers.value, medianMatch, weekIndex + 1);
  }

  const standingsResponse = {
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
  const matchups = {};
  let scoresArray = [];
  for (const match of matchup) {
    if (!matchups[match.matchup_id]) {
      matchups[match.matchup_id] = [];
    }
    const rosterId = match.roster_id;
    const user = leagueUsers[leagueRosters.rosters[match.roster_id - 1].owner_id];
    const userId = user ? user.user_id : 0
    const manager = await getLeagueManagerDisplay(leagueId, userId);

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
        totalPointsFor: 0,
        totalPointsAgainst: 0,
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
    const numberOfManagers = scoresArray.length;
    const middle = Math.floor(numberOfManagers / 2);
    medianScore = numberOfManagers % 2 !== 0 ? scoresArray[middle] : +((scoresArray[middle - 1] + scoresArray[middle]) / 2).toFixed(2);
  }

  for (const matchupKey in matchups) {
    const team1 = matchups[matchupKey][0];
    const team2 = matchups[matchupKey][1];
    const divisionMatchup = team1.division && team2.division && team1.division === team2.division;

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
    if (team1.points > team2.points) {
      standingsData[team1.rosterId].playerWins++;
      standingsData[team1.rosterId].totalWins++;
      standingsData[team2.rosterId].playerLosses++;
      standingsData[team2.rosterId].totalLosses++;
      if (divisionMatchup) {
        standingsData[team1.rosterId].divisionWins++;
        standingsData[team2.rosterId].divisionLosses++;
      }
    }
    else if (team2.points > team1.points) {
      standingsData[team2.rosterId].playerWins++;
      standingsData[team2.rosterId].totalWins++;
      standingsData[team1.rosterId].playerLosses++;
      standingsData[team1.rosterId].totalLosses++;
      if (divisionMatchup) {
        standingsData[team2.rosterId].divisionWins++;
        standingsData[team1.rosterId].divisionLosses++;
      }
    }
    else if (team1.points === team2.points) {
      standingsData[team1.rosterId].playerTies++;
      standingsData[team1.rosterId].totalTies++;
      standingsData[team2.rosterId].playerTies++;
      standingsData[team2.rosterId].totalTies++;
      if (divisionMatchup) {
        standingsData[team1.rosterId].divisionTies++;
        standingsData[team2.rosterId].divisionTies++;
      }
    }

    // Total Points For/Against
    standingsData[team1.rosterId].totalPointsFor = +(standingsData[team1.rosterId].totalPointsFor + team1.points).toFixed(2);
    standingsData[team1.rosterId].totalPointsAgainst = +(standingsData[team1.rosterId].totalPointsAgainst + team2.points).toFixed(2);
    standingsData[team2.rosterId].totalPointsFor = +(standingsData[team2.rosterId].totalPointsFor + team2.points).toFixed(2);
    standingsData[team2.rosterId].totalPointsAgainst = +(standingsData[team2.rosterId].totalPointsAgainst + team1.points).toFixed(2);

    // Weekly Standings
    standingsData[team1.rosterId].weeklyStandings.push({
      week: week,
      medianWins: standingsData[team1.rosterId].medianWins,
      medianLosses: standingsData[team1.rosterId].medianLosses,
      medianTies: standingsData[team1.rosterId].medianTies,
      playerWins: standingsData[team1.rosterId].playerWins,
      playerLosses: standingsData[team1.rosterId].playerLosses,
      playerTies: standingsData[team1.rosterId].playerTies,
      totalWins: standingsData[team1.rosterId].totalWins,
      totalLosses: standingsData[team1.rosterId].totalLosses,
      totalTies: standingsData[team1.rosterId].totalTies,
      pointsFor: team1.points,
      pointsAgainst: team2.points
    });
    
    standingsData[team2.rosterId].weeklyStandings.push({
      week: week,
      medianWins: standingsData[team2.rosterId].medianWins,
      medianLosses: standingsData[team2.rosterId].medianLosses,
      medianTies: standingsData[team2.rosterId].medianTies,
      playerWins: standingsData[team2.rosterId].playerWins,
      playerLosses: standingsData[team2.rosterId].playerLosses,
      playerTies: standingsData[team2.rosterId].playerTies,
      totalWins: standingsData[team2.rosterId].totalWins,
      totalLosses: standingsData[team2.rosterId].totalLosses,
      totalTies: standingsData[team2.rosterId].totalTies,
      pointsFor: team2.points,
      pointsAgainst: team1.points
    });
  }

  return standingsData;
}
