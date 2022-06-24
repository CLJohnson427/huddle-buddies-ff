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

export function getWeeklyStandingsLineChartData(leagueStandings) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the the Line Chart Options Object.
  let lineChartOptions = {
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

  // Setup the Line Chart Series Data.
  let lineChartSeries = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Wins.
  //teamStandingsData.sort((a, b) => b.totalWins - a.totalWins);

  // Iterate through each Team to setup the Line Chart Series Data.
  for (const team of teamStandingsData) {
    let totalWins = [];
    team.weeklyStandings.forEach((weeklyStanding) => {
      totalWins.push(weeklyStanding.totalWins);
    });

    lineChartSeries.push({
      name: `${team.manager.managerName}`,
      data: totalWins
    });
  }

  return { chartOptions: lineChartOptions, chartSeries: lineChartSeries }
}

export function getLeagueStandingsBarChartData(leagueStandings, { stackedBarChart = false, verticalBarChart = true, includeWins = true, includeLosses = true, includeMedian = true, combineMedian = false } = {}) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the Bar Chart Data.
  let barChartCategories = [];
  let barChartColors = [];
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

  // Iterate through each Team to setup the Bar Chart Data.
  for (const team of teamStandingsData) {
    barChartCategories.push(`${team.manager.managerName}`)
    totalWins.push(team.totalWins);
    playerWins.push(team.playerWins);
    medianWins.push(team.medianWins);
    totalLosses.push(team.totalLosses);
    playerLosses.push(team.playerLosses);
    medianLosses.push(team.medianLosses);
  }

  // Setup the the Bar Chart Options Object.
  let barChartOptions = {
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
    dataLabels: {
      style: {
        colors: ['#000000']
      }
    },
    title: {
      text:`${leagueStandings.seasonYear} League Standings`,
      align: 'center'
    },
    xaxis: {
      type: 'category',
      categories: barChartCategories,
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
    barChartOptions.chart.stacked = true;
    barChartOptions.xaxis.max = leagueStandings.medianMatch ? weeks.length * 2 : weeks.length;
    barChartOptions.yaxis.max = leagueStandings.medianMatch ? weeks.length * 2 : weeks.length;
  }

  // Update the Chart Options for a Vertical Bar Chart.
  if (verticalBarChart) {
    barChartOptions.plotOptions.bar.horizontal = false;
  }

  // Update the Chart Options if the median data is combined or separated.
  if (combineMedian) {
    barChartOptions.xaxis.max = leagueStandings.medianMatch ? weeks.length * 2 : weeks.length;
    barChartOptions.yaxis.max = leagueStandings.medianMatch ? weeks.length * 2 : weeks.length;
  }
  
  // Setup the Bar Chart Series Data.
  let barChartSeries = [];

  // Wins
  if (includeWins) {
    if (combineMedian) {
      // Set Total Wins Data & Color.
      barChartSeries.push({
        name: 'Total Wins',
        data: totalWins
      });
      barChartColors.push('#00e396');
    }
    else {
      // Set Player Wins Data & Color.
      barChartSeries.push({
        name: 'Player Wins',
        data: playerWins
      });
      barChartColors.push('#00e396');

      if (includeMedian) {
        // Set Median Wins Data & Color.
        barChartSeries.push({
          name: 'Median Wins',
          data: medianWins
        });
        barChartColors.push('#008ffb');
      }
    }
  }
  // Losses
  if (includeLosses) {
    if (combineMedian) {
      // Set Total Losses Data & Color.
      barChartSeries.push({
        name: 'Total Losses',
        data: totalLosses
      });
      barChartColors.push('#ff4560');
    }
    else {
      // Set Player Losses Data & Color.
      barChartSeries.push({
        name: 'Player Losses',
        data: playerLosses
      });
      barChartColors.push('#ff4560');

      if (includeMedian) {
        // Set Median Losses Data & Color.
        barChartSeries.push({
          name: 'Median Losses',
          data: medianLosses
        });
        barChartColors.push('#feb019');
      }
    }
  }

  // Set the Bar Chart Colors.
  barChartOptions.colors = barChartColors;

  return { chartOptions: barChartOptions, chartSeries: barChartSeries }
}
