<template>
  <div class="leagueStandingsBarChart">
    <div v-if="lineChartData">
      <apexchart
        type="line"
        :height="height"
        :width="width"
        :options="lineChartData.chartOptions"
        :series="lineChartData.chartSeries"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, ref, toRaw, watch } from "vue";
import { useLeagueStore } from "@/store/useLeague.js";
import { getWeeklyStandingsLineChartData } from "@/data/chartData.js";
import { getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Props
const props = defineProps({
  leagueId: { type: String, required: false, default: getMostRecentLeagueInfo('id') },
  height: { type: Number, required: false, default: 800 },
  width: { type: Number, required: false, default: 1500 },
  darkMode: { type: Boolean, required: false, default: false },
  // includeWins: { type: Boolean, required: false, default: true },
  // includeMedian: { type: Boolean, required: false, default: true },
  // combineMedian: { type: Boolean, required: false, default: false }
})

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let lineChartData = ref();

async function getChartData(leagueId) {
  // Get League Standing Data.
  await leagueStore.getLeagueStandings(leagueId);

  // Weekly Standings Line Chart Data
  lineChartData.value = getWeeklyStandingsLineChartData(toRaw(leagueStore.standings), { darkMode: props.darkMode });
}

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  // Get League Standing Data and Line Chart Data.
  await getChartData(props.leagueId);
})

// Update the League Data when the LeagueId Prop is changed.
watch(() => props.leagueId, async () => {
  // Get League Standing Data and Line Chart Data with the new LeagueId.
  await getChartData(props.leagueId);
})
</script>

<style>

</style>