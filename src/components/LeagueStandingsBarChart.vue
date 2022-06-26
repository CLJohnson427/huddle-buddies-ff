<template>
  <div class="leagueStandingsBarChart">

    <button @click="stackedBarChartLocal = !stackedBarChartLocal">Stacked Chart</button>
    <button @click="verticalBarChartLocal = !verticalBarChartLocal">Vertical Chart</button>
    <button @click="includeWinsLocal = !includeWinsLocal">Include Wins</button>
    <button @click="includeLossesLocal = !includeLossesLocal">Include Losses</button>
    <button @click="includeMedianLocal = !includeMedianLocal">Include Median</button>
    <button @click="combineMedianLocal = !combineMedianLocal">Combine Median</button>

    <div v-if="barChartData.chartSeries">
      <apexchart
        type="bar"
        :height="height"
        :width="width"
        :options="barChartData.chartOptions"
        :series="barChartData.chartSeries"
      ></apexchart>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, ref, toRaw, watch } from "vue";
import { useLeagueStore } from "@/store/useLeague.js";
import { getLeagueStandingsBarChartData } from "@/data/chartData.js";
import { getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Props
const props = defineProps({
  leagueId: { type: String, required: false, default: getMostRecentLeagueInfo('id') },
  height: { type: [String, Number], required: false, default: 'auto' },
  width: { type: [String, Number], required: false, default: '100%' },
  darkMode: { type: Boolean, required: false, default: false },
  stackedBarChart: { type: Boolean, required: false, default: false },
  verticalBarChart: { type: Boolean, required: false, default: true },
  includeWins: { type: Boolean, required: false, default: true },
  includeLosses: { type: Boolean, required: false, default: true },
  includeMedian: { type: Boolean, required: false, default: true },
  combineMedian: { type: Boolean, required: false, default: false }
})

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let barChartData = ref({});

// Local Refs for Prop Values. Needed to update values for Chart Options.
let darkModeLocal = ref(props.darkMode);
let stackedBarChartLocal = ref(props.stackedBarChart);
let verticalBarChartLocal = ref(props.verticalBarChart);
let includeWinsLocal = ref(props.includeWins);
let includeLossesLocal = ref(props.includeLosses);
let includeMedianLocal = ref(props.includeMedian);
let combineMedianLocal = ref(props.combineMedian);

async function getChartData(leagueId) {
  // Get League Standing Data.
  if (leagueStore.standings.league_id !== leagueId) {
    await leagueStore.getLeagueStandings(leagueId);
  }
  
  // League Standings Bar Chart Data
   barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), {
    darkMode: darkModeLocal.value, stackedBarChart: stackedBarChartLocal.value, verticalBarChart: verticalBarChartLocal.value,
    includeWins: includeWinsLocal.value, includeLosses: includeLossesLocal.value,
    includeMedian: includeMedianLocal.value, combineMedian: combineMedianLocal.value
  });
}

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  // Get League Standing Data and Bar Chart Data.
  await getChartData(props.leagueId);
})

// Update the League Data when the LeagueId Prop is changed.
watch(() => props.leagueId, async () => {
  // Get League Standing Data and Bar Chart Data with the new LeagueId.
  await getChartData(props.leagueId);
})

// Updated the Chart Options when the stackedBarChartLocal Ref is changed.
watch(stackedBarChartLocal, () => {
  // Get the number of Regular Season Weeks in the League.
  let weeks = leagueStore.league.settings.playoff_week_start - 1;

  // Double the number of weeks if the chart will be changed to a Stacked Chart and the median is included or combined.
  if (stackedBarChartLocal.value === true && (includeMedianLocal.value === true || combineMedianLocal.value === true)) {
    weeks *= 2;
  }
  
  // Set the updated chart options.
  barChartData.value.chartOptions = {
    ...barChartData.value.chartOptions,
    ...{
      chart: {
        stacked: stackedBarChartLocal.value
      },
      xaxis: {
        max: weeks
      },
      yaxis: {
        max: weeks
      }
    }
  };
})

// Updated the Chart Options when the verticalBarChartLocal Ref is changed.
watch(verticalBarChartLocal, () => {
  // Set the updated chart options.
  barChartData.value.chartOptions = {
    ...barChartData.value.chartOptions,
    ...{
      plotOptions: {
        bar: {
          horizontal: !verticalBarChartLocal.value
        },
      },
    }
  };
})

// Get the Chart Data and Options again when any of the Wins, Losses, or Median local refs are changed.
watch([includeWinsLocal, includeLossesLocal, includeMedianLocal, combineMedianLocal], async () => {
  // Get League Standing Data and Bar Chart Data.
  await getChartData(props.leagueId);
})
</script>

<style>

</style>