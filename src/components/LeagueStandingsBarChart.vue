<template>
  <div class="leagueStandingsBarChart">
    <div v-if="barChartData">
      <apexchart
        type="bar"
        :height="height"
        :width="width"
        :options="barChartData.chartOptions"
        :series="barChartData.chartSeries"
      ></apexchart>
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
  height: { type: Number, required: false, default: 800 },
  width: { type: Number, required: false, default: 1500 },
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
let barChartData = ref();

async function getChartData(leagueId) {
  // Get League Standing Data.
  await leagueStore.getLeagueStandings(leagueId);
  
  // League Standings Bar Chart Data
  barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), {
    stackedBarChart: props.stackedBarChart, verticalBarChart: props.verticalBarChart,
    includeWins: props.includeWins, includeLosses: props.includeLosses,
    includeMedian: props.includeMedian, combineMedian: props.combineMedian
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
</script>

<style>

</style>