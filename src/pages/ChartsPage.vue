<template>
  <main class="charts">
    <hr />
    <img alt="Huddle Buddies logo" src="../assets/huddle-buddies-thumbnail.png" />
    <h1>This is the charts page</h1>

    <div v-if="lineChartData">
      <apexchart
        width="1500"
        height="500"
        type="line"
        :options="lineChartData.chartOptions"
        :series="lineChartData.chartSeries"
      ></apexchart>
    </div>

    <div v-if="barChartData">
      <apexchart
        width="1500"
        height="800"
        type="bar"
        :options="barChartData.chartOptions"
        :series="barChartData.chartSeries"
      ></apexchart>
    </div>

    <div v-if="barChartDataWins">
      <apexchart
        width="1500"
        height="500"
        type="bar"
        :options="barChartDataWins.chartOptions"
        :series="barChartDataWins.chartSeries"
      ></apexchart>
    </div>

    <div v-if="barChartDataLoses">
      <apexchart
        width="1500"
        height="500"
        type="bar"
        :options="barChartDataLoses.chartOptions"
        :series="barChartDataLoses.chartSeries"
      ></apexchart>
    </div>

  </main>
</template>

<script setup>
import { ref, toRaw, onBeforeMount } from 'vue';
import { useLeagueStore } from '@/store/useLeague';
import { getWeeklyStandingsLineChartData, getLeagueStandingsBarChartData } from '@/data/chartData.js';

// Setup the leagueStore.
const leagueStore = useLeagueStore();

let lineChartData = ref();
let barChartData = ref();
let barChartDataWins = ref();
let barChartDataLoses = ref();

onBeforeMount(async () => {
  // Apex Charts
  // https://apexcharts.com/docs/series/
  // https://apexcharts.com/docs/options/chart/type/
  // https://apexcharts.com/vue-chart-demos/

  // Get League Standing Data.
  await leagueStore.getLeagueStandings();
  
  lineChartData.value = getWeeklyStandingsLineChartData(toRaw(leagueStore.standings));
  // console.log('lineChartData', lineChartData);

  barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { stackedBarChart: false, verticalBarChart: true, includeWins: true, includeLosses: true, includeMedian: false, combineMedian: true });
  // barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { verticalBarChart: true, combineMedian: true });
  // console.log('barChartData', barChartData);

  barChartDataWins.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { includeWins: true, includeLosses: false, includeMedian: true });
  // console.log('barChartDataWins', barChartDataWins);
  
  barChartDataLoses.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { includeWins: false, includeLosses: true, includeMedian: true });
  // console.log('barChartDataLoses', barChartDataLoses);
})
</script>

<style>

</style>
