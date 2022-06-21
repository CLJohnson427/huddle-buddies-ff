
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

export function getLeagueStandingsBarChartData(leagueStandings, stackedBarChart = false, verticalBarChart = false) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the Bar Chart Data.
  let barChartCategories = [];
  let playerWins = [];
  let medianWins = [];
  let playerLosses = [];
  let medianLosses = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Wins.
  teamStandingsData.sort((a, b) => b.totalWins - a.totalWins);

  // Iterate through each Team to setup the Bar Chart Data.
  for (const team of teamStandingsData) {
    barChartCategories.push(`${team.manager.managerName}`)
    playerWins.push(team.playerWins);
    medianWins.push(team.medianWins);
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
    colors: ['#00e396', '#008ffb', '#ff4560', '#feb019'],
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
  
  // Setup the Bar Chart Series Data.
  let barChartSeries = [];
  barChartSeries.push({
    name: 'Player Wins',
    data: playerWins
  });
  barChartSeries.push({
    name: 'Median Wins',
    data: medianWins
  });
  barChartSeries.push({
    name: 'Player Losses',
    data: playerLosses
  });
  barChartSeries.push({
    name: 'Median Losses',
    data: medianLosses
  });

  return { chartOptions: barChartOptions, chartSeries: barChartSeries }
}

export function getLeagueStandingsTotalWinsBarChartData(leagueStandings, stackedBarChart = false, verticalBarChart = false) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the Bar Chart Data.
  let barChartCategories = [];
  let playerWins = [];
  let medianWins = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Wins.
  teamStandingsData.sort((a, b) => b.totalWins - a.totalWins);

  // Iterate through each Team to setup the Bar Chart Data.
  for (const team of teamStandingsData) {
    barChartCategories.push(`${team.manager.managerName}`)
    playerWins.push(team.playerWins);
    medianWins.push(team.medianWins);
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
    colors: ['#00e396', '#008ffb'],
    dataLabels: {
      style: {
        colors: ['#000000']
      }
    },
    title: {
      text:`${leagueStandings.seasonYear} League Standings (Total Wins)`,
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
  
  // Setup the Bar Chart Series Data.
  let barChartSeries = [];
  barChartSeries.push({
    name: 'Player Wins',
    data: playerWins
  });
  barChartSeries.push({
    name: 'Median Wins',
    data: medianWins
  });

  return { chartOptions: barChartOptions, chartSeries: barChartSeries }
}

export function getLeagueStandingsTotalLossesBarChartData(leagueStandings, stackedBarChart = false, verticalBarChart = false) {
  // Setup League Weeks Data
  let weeks = [];
  for (let i = 0; i < leagueStandings.standings[1].weeklyStandings.length; i++) {
    weeks.push(leagueStandings.standings[1].weeklyStandings[i].week);
  }

  // Setup the Bar Chart Data.
  let barChartCategories = [];
  let playerLosses = [];
  let medianLosses = [];

  // Iterate through each leagueStandings.standings property to add each Team to an array.
  let teamStandingsData = [];
  for (const key in leagueStandings.standings) {
    teamStandingsData.push(leagueStandings.standings[key]);
  }

  // Sort Teams by Total Losses.
  teamStandingsData.sort((a, b) => b.totalLosses - a.totalLosses);

  // Iterate through each Team to setup the Bar Chart Data.
  for (const team of teamStandingsData) {
    barChartCategories.push(`${team.manager.managerName}`)
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
    colors: ['#ff4560', '#feb019'],
    dataLabels: {
      style: {
        colors: ['#000000']
      }
    },
    title: {
      text:`${leagueStandings.seasonYear} League Standings (Total Losses)`,
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
  
  // Setup the Bar Chart Series Data.
  let barChartSeries = [];
  barChartSeries.push({
    name: 'Player Losses',
    data: playerLosses
  });
  barChartSeries.push({
    name: 'Median Losses',
    data: medianLosses
  });

  return { chartOptions: barChartOptions, chartSeries: barChartSeries }
}