<template>
  <div class="leagueStandingsBarChart">
    <div v-if="chartData.chartSeries">
      <div class="chartIcons">
        <div class="chartIcon" :title="stackedBarChartLocal ? 'Bar Chart' : 'Stacked Chart'">
          <Icon v-if="stackedBarChartLocal"
            icon="mdi:chart-bar" :height="chartIconHeight" :width="chartIconWidth"
            @click="stackedBarChartLocal = !stackedBarChartLocal"
          />
          <Icon v-else
            icon="mdi:chart-bar-stacked" :height="chartIconHeight" :width="chartIconWidth"
            @click="stackedBarChartLocal = !stackedBarChartLocal"
          />
        </div>
        <div class="chartIcon" :title="verticalBarChartLocal ? 'Horizontal Chart' : 'Vertical Chart'">
          <Icon v-if="verticalBarChartLocal"
            icon="mdi:chart-box" :height="chartIconHeight" :width="chartIconWidth"
            @click="verticalBarChartLocal = !verticalBarChartLocal"
          />
          <Icon v-else
            icon="mdi:chart-box-outline" :height="chartIconHeight" :width="chartIconWidth"
            @click="verticalBarChartLocal = !verticalBarChartLocal"
          />
        </div>
        <div class="chartIcon" :title="includeWinsLocal ? 'Remove Wins' : 'Include Wins'">
          <Icon v-if="includeWinsLocal"
            icon="mdi:trophy" :height="chartIconHeight" :width="chartIconWidth"
            @click="includeWinsLocal = !includeWinsLocal"
          />
          <Icon v-else
            icon="mdi:trophy-outline" :height="chartIconHeight" :width="chartIconWidth"
            @click="includeWinsLocal = !includeWinsLocal"
          />
        </div>
        <div class="chartIcon" :title="includeLossesLocal ? 'Remove Losses' : 'Include Losses'">
          <Icon v-if="includeLossesLocal"
            icon="mdi:alpha-l-box" :height="chartIconHeight" :width="chartIconWidth"
            @click="includeLossesLocal = !includeLossesLocal"
          />
          <Icon v-else
            icon="mdi:alpha-l-box-outline" :height="chartIconHeight" :width="chartIconWidth"
            @click="includeLossesLocal = !includeLossesLocal"
          />
        </div>
        <div class="chartIcon" :title="includeMedianLocal ? 'Remove Median' : 'Include Median'">
          <Icon v-if="includeMedianLocal"
            icon="mdi:medal" :height="chartIconHeight" :width="chartIconWidth"
            @click="includeMedianLocal = !includeMedianLocal"
          />
          <Icon v-else
            icon="mdi:medal-outline" :height="chartIconHeight" :width="chartIconWidth"
            @click="includeMedianLocal = !includeMedianLocal"
          />
        </div>
        <div class="chartIcon" :title="combineMedianLocal ? 'Separate Player & Median Records' : 'Combine Player & Median Records'">
          <Icon v-if="combineMedianLocal"
            icon="mdi:arrow-expand-horizontal" :height="chartIconHeight" :width="chartIconWidth"
            @click="combineMedianLocal = !combineMedianLocal"
          />
          <Icon v-else
            icon="mdi:arrow-collapse-horizontal" :height="chartIconHeight" :width="chartIconWidth"
            @click="combineMedianLocal = !combineMedianLocal"
          />
        </div>
      </div>

      <apexchart
        type="bar"
        :height="height"
        :width="width"
        :options="chartData.chartOptions"
        :series="chartData.chartSeries"
      ></apexchart>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, ref, toRaw, watch } from "vue";
import { Icon } from '@iconify/vue'
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
let chartData = ref({});
let chartIconHeight = ref(40);
let chartIconWidth = ref(50);

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
  
  // League Standings Chart Data
   chartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), {
    darkMode: darkModeLocal.value, stackedBarChart: stackedBarChartLocal.value, verticalBarChart: verticalBarChartLocal.value,
    includeWins: includeWinsLocal.value, includeLosses: includeLossesLocal.value,
    includeMedian: includeMedianLocal.value, combineMedian: combineMedianLocal.value
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
  //                 stackedBarChartLocal.value = !stackedBarChartLocal.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:chart-bar" data-width="24" data-height="24"></span>',
  //               index: 2,
  //               title: 'Vertical Chart',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 verticalBarChartLocal.value = !verticalBarChartLocal.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:trophy" data-width="24" data-height="24"></span>',
  //               index: 3,
  //               title: 'Include Wins',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 includeWinsLocal.value = !includeWinsLocal.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:trophy-broken" data-width="24" data-height="24"></span>',
  //               index: 4,
  //               title: 'Include Losses',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 includeLossesLocal.value = !includeLossesLocal.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:trophy-award" data-width="24" data-height="24"></span>',
  //               index: 5,
  //               title: 'Include Median',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 includeMedianLocal.value = !includeMedianLocal.value
  //               }
  //             },
  //             {
  //               icon: '<span class="iconify" data-icon="mdi:merge" data-width="24" data-height="24"></span>',
  //               index: 6,
  //               title: 'Combine Median',
  //               class: 'apexcharts-menu-icon',
  //               click: function () {
  //                 combineMedianLocal.value = !combineMedianLocal.value
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

// Update the League Data when the LeagueId Prop is changed.
watch(() => props.leagueId, async () => {
  // Get League Standing Data and Chart Data with the new LeagueId.
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
  chartData.value.chartOptions = {
    ...chartData.value.chartOptions,
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
  chartData.value.chartOptions = {
    ...chartData.value.chartOptions,
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
  // Get League Standing Data and Chart Data.
  await getChartData(props.leagueId);
})
</script>

<style>
.leagueStandingsBarChart .chartIcons {
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 960px) {
  .leagueStandingsBarChart .chartIcons {
    display: flex;
    justify-content: flex-end;
  }
  .leagueStandingsBarChart .chartIcon {
    cursor: pointer;
  }
}
</style>