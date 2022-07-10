<template>
  <div class="leaguePointsLineChart">
    <div v-if="chartData">
      <div class="chartIcons">
        <div class="chartIcon" :title="includeChartMarkers ? 'Remove Chart Markers' : 'Include Chart Markers'">
          <Icon v-if="includeChartMarkers"
            icon="mdi:chart-line-variant" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeChartMarkers = !includeChartMarkers"
          />
          <Icon v-else
            icon="mdi:chart-timeline-variant" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeChartMarkers = !includeChartMarkers"
          />
        </div>
      </div>
      <apexchart
        type="line"
        :height="props.chartHeight"
        :width="props.chartWidth"
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
import { defineProps, onBeforeMount, ref, toRaw, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useLeagueStore } from '@/store/useLeague.js';
import { getLeaguePointsLineChartData } from '@/data/chartData.js';
import { getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Props
const props = defineProps({
  leagueId: { type: String, required: false, default: getMostRecentLeagueInfo('id') },
  chartHeight: { type: [String, Number], required: false, default: 'auto' },
  chartWidth: { type: [String, Number], required: false, default: '100%' },
  chartIconHeight: { type: Number, required: false, default: 40 },
  chartIconWidth: { type: Number, required: false, default: 50 },
  darkMode: { type: Boolean, required: false, default: false },
  includeChartMarkers: { type: Boolean, required: false, default: false }
})

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let chartData = ref();

// Local Refs for Prop Values. Needed to update values for Chart Options.
let includeChartMarkers = ref(props.includeChartMarkers);

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
  chartData.value = getLeaguePointsLineChartData(toRaw(leagueStore.standings), { darkMode: props.darkMode, includeChartMarkers: includeChartMarkers.value });
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

// Updated the Chart Options when the includeChartMarkers Ref is changed.
watch(includeChartMarkers, () => {
  // Set the updated chart options.
  chartData.value.chartOptions = {
    ...chartData.value.chartOptions,
    ...{
      markers: {
      size: includeChartMarkers.value ? 5 : 0,
      shape: "circle",
      hover: {
        sizeOffset: 3
      }
    }
    }
  };
})
</script>

<style lang="scss">
</style>