import { getLeagueInfo } from '@/data/sleeper/leagueInfo';
import { getLeagueMatchupData } from '@/data/sleeper/leagueMatchups';
import { getLeagueRosters } from '@/data/sleeper/leagueRosters';
import { getLeagueUsers, getLeagueManagerDisplay } from '@/data/sleeper/leagueUsers';
import { getSportState } from '@/data/sleeper/sportState';
import { useLeagueStore } from '@/store/useLeague';
import { League } from '@/data/types/LeagueInterfaces';
import { Matchup, MatchupData } from '@/data/types/MatchupInterfaces';
import { Rosters } from '@/data/types/RosterInterfaces';
import { SportState } from '@/data/types/SportStateInterfaces';
import { Standings, TeamStanding } from '@/data/types/StandingsInterfaces';
import { Users } from '@/data/types/UserInterfaces';

export async function getLeagueStandings(leagueId: string): Promise<Standings | null> {
  const leagueStore = useLeagueStore();

  if (leagueStore.standings.league_id === leagueId) {
    return leagueStore.standings;
  }

  // Fetch and resolve necessary League data.
  const leagueInfo: League = await getLeagueInfo(leagueId);
  const leagueRosters: Rosters = await getLeagueRosters(leagueId);
  const leagueUsers: Users = await getLeagueUsers(leagueId);
  const sportState: SportState = await getSportState();

  // Setup the Season data.
  const seasonYear = leagueInfo.season;
  const medianMatch = leagueInfo.settings.league_average_match === 1;
  let week = leagueInfo.settings.start_week;
  if (leagueInfo.status === 'in_season') {
    week = sportState.display_week;
  }
  else if (leagueInfo.status === 'post_season' || leagueInfo.status === 'complete') {
    week = leagueInfo.settings.playoff_week_start;
  }

  // Cannot retrieve standings if the season hasn't happened or
  // if at least one week of games has occurred.
  if ((leagueInfo.status !== 'in_season'
      && leagueInfo.status !== 'post_season'
      && leagueInfo.status !== 'complete')
      || week < 2
  ) {
    return null;
  }

  // Get all of the matchup data for the completed weeks in the season.
  const matchupData: MatchupData = await getLeagueMatchupData(leagueId, week);

  // Process Standings data from the season matchups.
  let standings = new Map<number, TeamStanding>();
  for (const [weekIndex, matchup] of matchupData.matchups.entries()) {
    // console.log('matchup', matchup)
    // console.log('weekIndex', weekIndex)
    standings = await processStandingsData(leagueId, matchup, standings, leagueRosters, leagueUsers, medianMatch, weekIndex + 1);
  }

  const standingsResponse = {
    league_id: leagueInfo.league_id,
    medianMatch: medianMatch,
    roster: leagueRosters.roster,
    seasonYear: seasonYear,
    standings: standings,
  } as Standings;

  leagueStore.$patch((state) => (state.standings = standingsResponse));

  return standingsResponse;
}

async function processStandingsData(leagueId: string, matchup: Matchup[], standings: Map<number, TeamStanding>, leagueRosters: Rosters, leagueUsers: Users, medianMatch: boolean, week: number): Promise<Map<number, TeamStanding>> {
  const matchups = {};
  let scoresArray = [] as number[];
  for (const match of matchup) {
    if (!matchups[match.matchup_id]) {
      matchups[match.matchup_id] = [];
    }
    const rosterId = match.roster_id;
    const roster = leagueRosters.roster.get(rosterId);
    const user = roster ? leagueUsers.user.get(roster.owner_id) : undefined;
    const userId = user ? user.user_id : '0';
    const manager = await getLeagueManagerDisplay(leagueId, userId);

    // Create the Standings Map entry if it does not already exist for the current roster.
    if (!standings.has(rosterId)) {
      standings.set(rosterId, {
        manager: manager,
        rosterId: rosterId,
        divisionWins: 0,
        divisionLosses: 0,
        divisionTies: 0,
        medianWins: 0,
        medianLosses: 0,
        medianTies: 0,
        playerWins: 0,
        playerLosses: 0,
        playerTies: 0,
        totalWins: 0,
        totalLosses: 0,
        totalTies: 0,
        totalPointsFor: 0,
        totalPointsAgainst: 0,
        weeklyStandings: []
      });
    }

    matchups[match.matchup_id].push({
      rosterId: rosterId,
      division: roster?.settings.division,
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
    const team1Standings = standings.get(matchups[matchupKey][0].rosterId) as TeamStanding;
    const team2Standings = standings.get(matchups[matchupKey][1].rosterId) as TeamStanding;

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

    standings.set(matchups[matchupKey][0].rosterId, team1Standings);
    standings.set(matchups[matchupKey][1].rosterId, team2Standings);
  }

  return standings;
}
