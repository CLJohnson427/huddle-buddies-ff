// This endpoint retrieves all matchups in a league for a given week. Each object in the list represents one team.
// The two teams with the same matchup_id match up against each other.
// The starters is in an ordered list of player_ids, and players is a list of all player_ids in this matchup.
// The bench can be deduced by removing the starters from the players field.
// GET https://api.sleeper.app/v1/league/<league_id>/matchups/<week>
export async function getMatchupsInLeagueByWeek(leagueId, week) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`).catch((error) => { console.log(error); });
  const data = await response.json().catch((error) => { console.log(error); });

  if (response.ok) {
    return data;
  }
  else {
    throw new Error(data);
  }
}
