import { getLeagueInfo } from "@/data/sleeper/leagueInfo";
import { getLeagueMatchupData } from "@/data/sleeper/leagueMatchups";
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
  const matchupData = await getLeagueMatchupData(leagueId, week);

  // Process Standings data from the season matchups.
  let standings = new Map();
  for (const [weekIndex, matchup] of matchupData.matchups.entries()) {
    standings = await processStandingsData(leagueId, matchup, standings, leagueRosters.value, leagueUsers.value, medianMatch, weekIndex + 1);
  }

  const standingsResponse = {
    league_id: leagueInfo.value.league_id,
    medianMatch: medianMatch,
    roster: leagueRosters.value.roster,
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
    const user = leagueUsers.user.get(leagueRosters.roster.get(match.roster_id).owner_id)
    const userId = user ? user.user_id : 0
    const manager = await getLeagueManagerDisplay(leagueId, userId);

    // Create the Standings Map entry if it does not already exist for the current roster.
    if (!standingsData.has(rosterId)) {
      standingsData.set(rosterId, {
        manager: manager,
        rosterId: rosterId,
        divisionWins: leagueRosters.roster.get(rosterId).settings.division ? 0 : null,
        divisionLosses: leagueRosters.roster.get(rosterId).settings.division ? 0 : null,
        divisionTies: leagueRosters.roster.get(rosterId).settings.division ? 0 : null,
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
      })
    }

    matchups[match.matchup_id].push({
      rosterId: rosterId,
      division: leagueRosters.roster.get(rosterId).settings.division,
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

  // Evaluate the data from each matchup.
  for (const matchupKey in matchups) {
    const team1 = matchups[matchupKey][0];
    const team2 = matchups[matchupKey][1];
    const divisionMatchup = team1.division && team2.division && team1.division === team2.division;
    const team1Standings = standingsData.get(matchups[matchupKey][0].rosterId);
    const team2Standings = standingsData.get(matchups[matchupKey][1].rosterId);

    // Median Matchup
    if (medianMatch === true) {
      // Team 1
      if (team1.points > medianScore) {
        team1Standings.medianWins++;
        team1Standings.totalWins++;
      }
      else if (team1.points < medianScore){
        team1Standings.medianLosses++;
        team1Standings.totalLosses++;
      }
      else if (team1.points === medianScore) {
        team1Standings.medianTies++;
        team1Standings.totalLosses++;
      }

      // Team 2
      if (team2.points > medianScore) {
        team2Standings.medianWins++;
        team2Standings.totalWins++;
      }
      else if (team2.points < medianScore){
        team2Standings.medianLosses++;
        team2Standings.totalLosses++;
      }
      else if (team2.points === medianScore) {
        team2Standings.medianTies++;
        team2Standings.totalLosses++;
      }
    }

    // Head to Head Matchup
    if (team1.points > team2.points) {
      team1Standings.playerWins++;
      team1Standings.totalWins++;
      team2Standings.playerLosses++;
      team2Standings.totalLosses++;
      if (divisionMatchup) {
        team1Standings.divisionWins++;
        team2Standings.divisionLosses++;
      }
    }
    else if (team2.points > team1.points) {
      team2Standings.playerWins++;
      team2Standings.totalWins++;
      team1Standings.playerLosses++;
      team1Standings.totalLosses++;
      if (divisionMatchup) {
        team2Standings.divisionWins++;
        team1Standings.divisionLosses++;
      }
    }
    else if (team1.points === team2.points) {
      team1Standings.playerTies++;
      team1Standings.totalTies++;
      team2Standings.playerTies++;
      team2Standings.totalTies++;
      if (divisionMatchup) {
        team1Standings.divisionTies++;
        team2Standings.divisionTies++;
      }
    }

    // Total Points For/Against
    team1Standings.totalPointsFor = +(team1Standings.totalPointsFor + team1.points).toFixed(2);
    team1Standings.totalPointsAgainst = +(team1Standings.totalPointsAgainst + team2.points).toFixed(2);
    team2Standings.totalPointsFor = +(team2Standings.totalPointsFor + team2.points).toFixed(2);
    team2Standings.totalPointsAgainst = +(team2Standings.totalPointsAgainst + team1.points).toFixed(2);

    // Weekly Standings
    team1Standings.weeklyStandings.push({
      week: week,
      medianWins: team1Standings.medianWins,
      medianLosses: team1Standings.medianLosses,
      medianTies: team1Standings.medianTies,
      playerWins: team1Standings.playerWins,
      playerLosses: team1Standings.playerLosses,
      playerTies: team1Standings.playerTies,
      totalWins: team1Standings.totalWins,
      totalLosses: team1Standings.totalLosses,
      totalTies: team1Standings.totalTies,
      pointsFor: team1.points,
      pointsAgainst: team2.points
    });
    
    team2Standings.weeklyStandings.push({
      week: week,
      medianWins: team2Standings.medianWins,
      medianLosses: team2Standings.medianLosses,
      medianTies: team2Standings.medianTies,
      playerWins: team2Standings.playerWins,
      playerLosses: team2Standings.playerLosses,
      playerTies: team2Standings.playerTies,
      totalWins: team2Standings.totalWins,
      totalLosses: team2Standings.totalLosses,
      totalTies: team2Standings.totalTies,
      pointsFor: team2.points,
      pointsAgainst: team1.points
    });

    standingsData.set(matchups[matchupKey][0].rosterId, team1Standings);
    standingsData.set(matchups[matchupKey][1].rosterId, team2Standings);
  }

  return standingsData;
}

/*
async function processStandingsData(leagueId, matchup, standingsData, leagueRosters, leagueUsers, medianMatch, week) {
  const matchups = {};
  let scoresArray = [];
  for (const match of matchup) {
    if (!matchups[match.matchup_id]) {
      matchups[match.matchup_id] = [];
    }
    const rosterId = match.roster_id;
    const user = leagueUsers.user.get(leagueRosters.roster.get(match.roster_id).owner_id)
    const userId = user ? user.user_id : 0
    const manager = await getLeagueManagerDisplay(leagueId, userId);

    // Create the Standings object if it does not already exist for the current roster.
    if (!standingsData[rosterId]) {
      standingsData[rosterId] = {
        manager: manager,
        rosterId: rosterId,
        divisionWins: leagueRosters.roster.get(rosterId).settings.division ? 0 : null,
        divisionLosses: leagueRosters.roster.get(rosterId).settings.division ? 0 : null,
        divisionTies: leagueRosters.roster.get(rosterId).settings.division ? 0 : null,
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
      division: leagueRosters.roster.get(rosterId).settings.division,
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
//*/
