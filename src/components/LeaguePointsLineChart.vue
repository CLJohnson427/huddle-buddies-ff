<template>
  <div class="leaguePointsLineChart">
    <div v-if="chartData">
      <apexchart
        type="line"
        :height="height"
        :width="width"
        :options="chartData.chartOptions"
        :series="chartData.chartSeries"
      ></apexchart>
    </div>
    <div v-else>
      Loading League Points Chart...
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, ref, toRaw, watch } from "vue";
import { useLeagueStore } from "@/store/useLeague.js";
import { getLeaguePointsLineChartData } from "@/data/chartData.js";
import { getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Props
const props = defineProps({
  leagueId: { type: String, required: false, default: getMostRecentLeagueInfo('id') },
  height: { type: [String, Number], required: false, default: 'auto' },
  width: { type: [String, Number], required: false, default: '100%' },
  darkMode: { type: Boolean, required: false, default: false }
})

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let chartData = ref();

async function getChartData(leagueId) {
  // Setup options to show the chart as loading if options are not available.
  // if (!chartData.value) {
  //   chartData.value = getLoadingChartOptions(props.darkMode);
  // }

  // Get League Standing Data.
  if (leagueStore.standings.league_id !== leagueId) {
    await leagueStore.getLeagueStandings(leagueId);
  }

  // League Points Chart Data
  chartData.value = getLeaguePointsLineChartData(toRaw(leagueStore.standings), { darkMode: props.darkMode });
}

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  // Get League Points Data and Chart Data.
  await getChartData(props.leagueId);
})

// Update the League Data when the LeagueId Prop is changed or the
// Chart Theme when the DarkMode Prop is changed.
watch([() => props.leagueId, () => props.darkMode], async () => {
  // Get League Standing Data and Chart Data with the new LeagueId.
  await getChartData(props.leagueId);
})
</script>

<style>

</style>