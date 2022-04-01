// This endpoint retrieves all rosters in a league.
// GET https://api.sleeper.app/v1/league/<leagueId>/rosters
export async function getRostersInLeague(leagueId) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.error(error); });
  const data = await response.json().catch((error) => { console.error(error); });

  if (response.ok) {
    const rosterData = processRosters(data)
    return rosterData;
  }
  else {
    throw new Error(data);
  }
}

// // This endpoint retrieves the roster data baed on the leagueId and ownerId.
// // GET https://api.sleeper.app/v1/league/<leagueId>/rosters
// export async function getOwnerRosterInLeague(leagueId, ownerId) {
//   const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).catch((error) => { console.error(error); });
//   const data = await response.json().catch((error) => { console.error(error); });

//   if (response.ok) {
//     let ownerRoser = data.find((roster) => { return roster.owner_id == ownerId });

//     return ownerRoser;
//   }
//   else {
//     throw new Error(data);
//   }
// }

function processRosters(rosters) {
  let startersAndReserve = [];
  for (let roster of rosters) {
    for (let starter of roster.starters) {
      startersAndReserve.push(starter);
    }

    if (roster.reserve) {
      for (let injuredReserve of roster.reserve) {
        startersAndReserve.push(injuredReserve);
      }
    }
  }

  return { rosters, startersAndReserve };
}
