<template>
  <div class="leagueStandingsBarChart">
    <div v-if="chartData.chartSeries">
      <div class="chartIcons">
        <div class="chartIcon" :title="stackedBarChart ? 'Bar Chart' : 'Stacked Chart'">
          <Icon v-if="stackedBarChart"
            icon="mdi:chart-bar" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="stackedBarChart = !stackedBarChart"
          />
          <Icon v-else
            icon="mdi:chart-bar-stacked" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="stackedBarChart = !stackedBarChart"
          />
        </div>
        <div class="chartIcon" :title="verticalBarChart ? 'Horizontal Chart' : 'Vertical Chart'">
          <Icon v-if="verticalBarChart"
            icon="mdi:chart-box" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="verticalBarChart = !verticalBarChart"
          />
          <Icon v-else
            icon="mdi:chart-box-outline" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="verticalBarChart = !verticalBarChart"
          />
        </div>
        <div class="chartIcon" :title="includeWins ? 'Remove Wins' : 'Include Wins'">
          <Icon v-if="includeWins"
            icon="mdi:trophy" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeWins = !includeWins"
          />
          <Icon v-else
            icon="mdi:trophy-outline" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeWins = !includeWins"
          />
        </div>
        <div class="chartIcon" :title="includeLosses ? 'Remove Losses' : 'Include Losses'">
          <Icon v-if="includeLosses"
            icon="mdi:alpha-l-box" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeLosses = !includeLosses"
          />
          <Icon v-else
            icon="mdi:alpha-l-box-outline" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeLosses = !includeLosses"
          />
        </div>
        <div class="chartIcon" :title="includeMedian ? 'Remove Median' : 'Include Median'">
          <Icon v-if="includeMedian"
            icon="mdi:medal" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeMedian = !includeMedian"
          />
          <Icon v-else
            icon="mdi:medal-outline" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="includeMedian = !includeMedian"
          />
        </div>
        <div class="chartIcon" :title="combineMedian ? 'Separate Player & Median Records' : 'Combine Player & Median Records'">
          <Icon v-if="combineMedian"
            icon="mdi:arrow-expand-horizontal" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="combineMedian = !combineMedian"
          />
          <Icon v-else
            icon="mdi:arrow-collapse-horizontal" :height="props.chartIconHeight" :width="props.chartIconWidth"
            @click="combineMedian = !combineMedian"
          />
        </div>
      </div>

      <apexchart
        type="bar"
        :height="props.chartHeight"
        :width="props.chartWidth"
        :options="chartData.chartOptions"
        :series="chartData.chartSeries"
      ></apexchart>
    </div>
    <div v-else>
      Loading League Standings Chart...
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, ref, toRaw, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useLeagueStore } from '@/store/useLeague.js';
import { getLeagueStandingsBarChartData } from '@/data/chartData.js';
import { getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Props
const props = defineProps({
  leagueId: { type: String, required: false, default: getMostRecentLeagueInfo('id') },
  chartHeight: { type: [String, Number], required: false, default: 'auto' },
  chartWidth: { type: [String, Number], required: false, default: '100%' },
  chartIconHeight: { type: Number, required: false, default: 40 },
  chartIconWidth: { type: Number, required: false, default: 50 },
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
let chartData = ref({});

// Local Refs for Prop Values. Needed to update values for Chart Options.
let stackedBarChart = ref(props.stackedBarChart);
let verticalBarChart = ref(props.verticalBarChart);
let includeWins = ref(props.includeWins);
let includeLosses = ref(props.includeLosses);
let includeMedian = ref(props.includeMedian);
let combineMedian = ref(props.combineMedian);

async function getChartData(leagueId) {
  // Setup options to show the chart as loading if options are not available.
  // if (!chartData.value.chartOptions) {
  //   chartData.value = getLoadingChartOptions(props.darkMode);
  // }
  
  // Get League Standing Data.
  if (leagueStore.standings.league_id !== leagueId) {
    await leagueStore.getLeagueStandings(leagueId);
  }
  
  // League Standings Chart Data
   chartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), {
    darkMode: props.darkMode, stackedBarChart: stackedBarChart.value, verticalBarChart: verticalBarChart.value,
    includeWins: includeWins.value, includeLosses: includeLosses.value,
    includeMedian: includeMedian.value, combineMedian: combineMedian.value
  });

  // Setup the Customized Toolbar Icons in the Chart Options
  // chartData.value.chartOptions = {
  //   ...chartData.value.chartOptions,
  //   ...{
  //     chart: {
  //       toolbar: {
  //         tools: {
  //           download: '<span class="iconify" data-icon="mdi:menu" data-width="24" data-height="24"></span>',
  //           // download: '<span class="iconify" data-icon="mdi:menu"></span>',
  //           customIcons: [
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:chart-bar-stacked" data-width="24" data-height="24"></span>',
  //               index: 1,
  //               title: 'Stacked Chart',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 stackedBarChart.value = !stackedBarChart.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:chart-bar" data-width="24" data-height="24"></span>',
  //               index: 2,
  //               title: 'Vertical Chart',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 verticalBarChart.value = !verticalBarChart.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:trophy" data-width="24" data-height="24"></span>',
  //               index: 3,
  //               title: 'Include Wins',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 includeWins.value = !includeWins.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:trophy-broken" data-width="24" data-height="24"></span>',
  //               index: 4,
  //               title: 'Include Losses',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 includeLosses.value = !includeLosses.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:trophy-award" data-width="24" data-height="24"></span>',
  //               index: 5,
  //               title: 'Include Median',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 includeMedian.value = !includeMedian.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:merge" data-width="24" data-height="24"></span>',
  //               index: 6,
  //               title: 'Combine Median',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 combineMedian.value = !combineMedian.value
  //               }
  //             },
  //           ]
  //         }
  //       }
  //     }
  //   }
  // };
}

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  // Get League Standing Data and Chart Data.
  await getChartData(props.leagueId);
})

// Update the League Data when the LeagueId Prop is changed or the
// Chart Theme when the DarkMode Prop is changed.
watch([() => props.leagueId, () => props.darkMode], async () => {
  // Get League Standing Data and Chart Data with the new LeagueId.
  await getChartData(props.leagueId);
})

// Updated the Chart Options when the stackedBarChart Ref is changed.
watch(stackedBarChart, () => {
  // Get the number of Regular Season Weeks in the League.
  let weeks = leagueStore.league.settings.playoff_week_start - 1;

  // Double the number of weeks if the chart will be changed to a Stacked Chart and the median is included or combined.
  if (stackedBarChart.value === true && (includeMedian.value === true || combineMedian.value === true)) {
    weeks *= 2;
  }
  
  // Set the updated chart options.
  chartData.value.chartOptions = {
    ...chartData.value.chartOptions,
    ...{
      chart: {
        stacked: stackedBarChart.value
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

// Updated the Chart Options when the verticalBarChart Ref is changed.
watch(verticalBarChart, () => {
  // Set the updated chart options.
  chartData.value.chartOptions = {
    ...chartData.value.chartOptions,
    ...{
      plotOptions: {
        bar: {
          horizontal: !verticalBarChart.value
        },
      },
    }
  };
})

// Get the Chart Data and Options again when any of the Wins, Losses, or Median local refs are changed.
watch([includeWins, includeLosses, includeMedian, combineMedian], async () => {
  // Get League Standing Data and Chart Data.
  await getChartData(props.leagueId);
})
</script>

<style lang="scss">
.leagueStandingsBarChart {
  .chartIcons {
    display: flex;
    justify-content: center;
  }
  .chartIcon {
    color: var(--icon-primary);
  }

  @media screen and (min-width: 960px) {
    .chartIcons {
      display: flex;
      justify-content: flex-end;
    }
    .chartIcon {
      cursor: pointer;
    }
  }
}
</style>
