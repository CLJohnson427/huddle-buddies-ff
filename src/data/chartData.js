export const teamChartColors = [
  // Ordered by RosterId.
  '#3099de', // Bo
  '#004586', // Chris
  '#772fdc', // Jacob
  '#3cb44b', // Chase
  '#ae1d1d', // Kevin
  '#f58231', // Aaron
  '#ffe119', // GeeMetz?
  '#469990', // Alex
  '#f032e6', // Colt
  '#8c564b' // Miller
]

export function getWeeklyStandingsLineChartData(leagueStandings, { darkMode = false } = {}) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the Chart Options Object.
  let chartOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
        autoScaleYaxis: true
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    title: {
      text:`${leagueStandings.seasonYear} Weekly Standings (Total Wins)`,
      align: 'center'
    },
    colors: teamChartColors,
    xaxis: {
      type: 'category',
      categories: weeks,
      title: {
        text: 'Week'
      }
    },
    yaxis: {
      min: 0,
      max: leagueStandings.medianMatch ? (weeks.length * 2) : weeks.length,
      tickAmount: weeks.length,
      title: {
        text: 'Wins'
      }
    }
  }

  // Setup the Chart Series Data.
  let chartSeries = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Wins.
  //teamStandingsData.sort((a, b) => b.totalWins - a.totalWins);

  // Iterate through each Team to setup the Chart Series Data.
  for (const team of teamStandingsData) {
    let totalWins = [];
    team.weeklyStandings.forEach((weeklyStanding) => {
      totalWins.push(weeklyStanding.totalWins);
    });

    chartSeries.push({
      name: `${team.manager.managerName}`,
      data: totalWins
    });
  }

  return { chartOptions, chartSeries }
}

export function getLeagueStandingsBarChartData(leagueStandings, { darkMode = false, stackedBarChart = false, verticalBarChart = true, includeWins = true, includeLosses = true, includeMedian = true, combineMedian = false } = {}) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the Chart Data.
  let chartCategories = [];
  let chartColors = [];
  let totalWins = [];
  let playerWins = [];
  let medianWins = [];
  let totalLosses = [];
  let playerLosses = [];
  let medianLosses = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Wins (if included).
  if (includeWins) {
    teamStandingsData.sort((a, b) => b.totalWins - a.totalWins);
  }
  else if (!includeWins && includeLosses) {
    // Sort Teams by Total Losses (if included).
    teamStandingsData.sort((a, b) => b.totalLosses - a.totalLosses);
  }

  // Iterate through each Team to setup the Chart Data.
  for (const team of teamStandingsData) {
    chartCategories.push(`${team.manager.managerName}`)
    totalWins.push(team.totalWins);
    playerWins.push(team.playerWins);
    medianWins.push(team.medianWins);
    totalLosses.push(team.totalLosses);
    playerLosses.push(team.playerLosses);
    medianLosses.push(team.medianLosses);
  }

  // Setup the the Chart Options Object.
  let chartOptions = {
    chart: {
      type: 'bar',
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2
      },
    },
    colors: [],
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    dataLabels: {
      style: {
        colors: darkMode ? ['#ffffff'] : ['#000000']
      }
    },
    title: {
      text:`${leagueStandings.seasonYear} League Standings`,
      align: 'center'
    },
    xaxis: {
      type: 'category',
      categories: chartCategories,
      min: 0,
      max: weeks.length,
      tickAmount: weeks.length,
      title: {
        text: ''
      }
    },
    yaxis: {
      min: 0,
      max: weeks.length,
      tickAmount: weeks.length,
      title: {
        text: ''
      }
    }
  }

  // Update the Chart Options for a Stacked Bar Chart.
  if (stackedBarChart) {
    chartOptions.chart.stacked = true;
    chartOptions.xaxis.max = includeMedian ? weeks.length * 2 : weeks.length;
    chartOptions.yaxis.max = includeMedian ? weeks.length * 2 : weeks.length;
  }

  // Update the Chart Options for a Vertical Bar Chart.
  if (verticalBarChart) {
    chartOptions.plotOptions.bar.horizontal = false;
  }

  // Update the Chart Options if the median data is combined or separated.
  if (combineMedian) {
    chartOptions.xaxis.max = leagueStandings.medianMatch ? weeks.length * 2 : weeks.length;
    chartOptions.yaxis.max = leagueStandings.medianMatch ? weeks.length * 2 : weeks.length;
  }
  
  // Setup the Chart Series Data.
  let chartSeries = [];

  // Wins
  if (includeWins) {
    if (combineMedian) {
      // Set Total Wins Data & Color.
      chartSeries.push({
        name: 'Total Wins',
        data: totalWins
      });
      chartColors.push('#00e396');
    }
    else {
      // Set Player Wins Data & Color.
      chartSeries.push({
        name: 'Player Wins',
        data: playerWins
      });
      chartColors.push('#00e396');

      if (includeMedian) {
        // Set Median Wins Data & Color.
        chartSeries.push({
          name: 'Median Wins',
          data: medianWins
        });
        chartColors.push('#008ffb');
      }
    }
  }
  // Losses
  if (includeLosses) {
    if (combineMedian) {
      // Set Total Losses Data & Color.
      chartSeries.push({
        name: 'Total Losses',
        data: totalLosses
      });
      chartColors.push('#ff4560');
    }
    else {
      // Set Player Losses Data & Color.
      chartSeries.push({
        name: 'Player Losses',
        data: playerLosses
      });
      chartColors.push('#ff4560');

      if (includeMedian) {
        // Set Median Losses Data & Color.
        chartSeries.push({
          name: 'Median Losses',
          data: medianLosses
        });
        chartColors.push('#feb019');
      }
    }
  }

  // Set the Chart Colors.
  chartOptions.colors = chartColors;

  return { chartOptions, chartSeries }
}

export function getLeaguePointsLineChartData(leagueStandings, { darkMode = false } = {}) {
  // Setup the Chart Data.
  let chartSeries = [];
  let chartCategories = [];
  let totalPointsFor = [];
  let totalPointsAgainst = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Wins.
  teamStandingsData.sort((a, b) => b.totalWins - a.totalWins);

  // Iterate through each Team to setup the Chart Categories and Series Data.
  for (const team of teamStandingsData) {
    chartCategories.push(`${team.manager.managerName}`)
    totalPointsFor.push(team.totalPointsFor);
    totalPointsAgainst.push(team.totalPointsAgainst);
  }

  // Setup the Chart Series Data.
  chartSeries.push({
    name: `Points For`,
    data: totalPointsFor
  });

  chartSeries.push({
    name: `Points Against`,
    data: totalPointsAgainst
  });

  // Setup the the Chart Options Object.
  let chartOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    title: {
      text:`${leagueStandings.seasonYear} Points For/Against`,
      align: 'center'
    },
    colors: ['#00e396', '#ff4560'],
    xaxis: {
      type: 'category',
      categories: chartCategories,
      title: {
        text: 'Teams'
      }
    },
    yaxis: {
      title: {
        text: 'Points'
      }
    }
  }

  return { chartOptions, chartSeries }
}
