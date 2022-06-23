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
import { ref, toRaw, onBeforeMount, defineProps, watch } from "vue";
import { useLeagueStore } from "@/store/useLeague";
import { getLeagueStandingsBarChartData } from "@/data/chartData";
import { getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo';

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

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  // Get League Standing Data.
  await leagueStore.getLeagueStandings(props.leagueId);
  
  // League Standings Bar Chart Data
  barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), {
    stackedBarChart: props.stackedBarChart, verticalBarChart: props.verticalBarChart,
    includeWins: props.includeWins, includeLosses: props.includeLosses,
    includeMedian: props.includeMedian, combineMedian: props.combineMedian
  });
})

// Update the League Data when the LeagueId Prop is changed.
watch(() => props.leagueId, async () => {
  // Get League Standing Data with the new LeagueId.
  await leagueStore.getLeagueStandings(props.leagueId);
  
  // League Standings Bar Chart Data
  barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), {
    stackedBarChart: props.stackedBarChart, verticalBarChart: props.verticalBarChart,
    includeWins: props.includeWins, includeLosses: props.includeLosses,
    includeMedian: props.includeMedian, combineMedian: props.combineMedian
  });
})
</script>

<style>

</style>