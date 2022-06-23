<template>
  <div class="home">
    <img alt="Huddle Buddies logo" src="../assets/huddle-buddies-thumbnail.png" />
    <h1>Huddle Buddies Dynasty Fantasy Football</h1>
    <br /><hr /><br />

    <select v-model="selectedLeagueId">
      <option v-for="leagueYear in leagueYears" :value="leagueYear.leagueId">{{ leagueYear.year }}</option>
    </select>

    <LeagueStandingsBarChart :leagueId="selectedLeagueId"
      :stackedBarChart="false" :verticalBarChart="true"
      :includeWins="true" :includeLosses="true"
      :includeMedian="true" :combineMedian="false"
    >
    </LeagueStandingsBarChart>

    <div v-if="lineChartData">
      <apexchart
        width="1500"
        height="500"
        type="line"
        :options="lineChartData.chartOptions"
        :series="lineChartData.chartSeries"
      ></apexchart>
    </div>

    <LeagueStandingsBarChart :leagueId="selectedLeagueId"
      :stackedBarChart="false" :verticalBarChart="true"
      :includeWins="true" :includeLosses="false"
      :includeMedian="true" :combineMedian="false"
    >
    </LeagueStandingsBarChart>

    <LeagueStandingsBarChart :leagueId="selectedLeagueId"
      :stackedBarChart="false" :verticalBarChart="true"
      :includeWins="false" :includeLosses="true"
      :includeMedian="true" :combineMedian="false"
    >
    </LeagueStandingsBarChart>
  </div>
</template>

<script setup>
import { ref, toRaw, onBeforeMount, watch } from "vue";
import { useLeagueStore } from "@/store/useLeague.js";
import { getWeeklyStandingsLineChartData, getLeagueStandingsBarChartData } from "@/data/chartData.js";
import { leagueIds, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';
import LeagueStandingsBarChart from '@/components/LeagueStandingsBarChart.vue'

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let lineChartData = ref();
let barChartData = ref();
let barChartDataWins = ref();
let barChartDataLoses = ref();
let leagueYears = ref(leagueIds);
let selectedLeagueId = ref(getMostRecentLeagueInfo('id'));

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  // Get League Standing Data.
  await leagueStore.getLeagueStandings();
  
  // Weekly Standings Line Chart Data
  lineChartData.value = getWeeklyStandingsLineChartData(toRaw(leagueStore.standings));

  // League Standings Bar Chart Data
  barChartData.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { stackedBarChart: false, verticalBarChart: true, includeWins: true, includeLosses: true, includeMedian: false, combineMedian: true });

  // League Standings (Total Wins) Bar Chart Data
  barChartDataWins.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { includeWins: true, includeLosses: false, includeMedian: true });
  
  // League Standings (Total Losses) Bar Chart Data
  barChartDataLoses.value = getLeagueStandingsBarChartData(toRaw(leagueStore.standings), { includeWins: false, includeLosses: true, includeMedian: true });
})

// watch(selectedLeagueId, (newValue) => {
//   console.log(`selectedLeagueId is ${newValue}`);
// })


/*
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "../components/HelloWorld.vue";
import { getLeagueInfo } from "@/data/sleeper/leagueInfo.js";
import { getLeagueMatchups } from "@/data/sleeper/leagueMatchups.js";
import { getLeagueRosters } from "@/data/sleeper/leagueRosters.js";
import { getLeagueStandings } from "@/data/sleeper/leagueStandings.js";
import { getLeagueUsers } from "@/data/sleeper/leagueUsers.js";
import { getSportState } from "@/data/sleeper/sportState.js";
import { ref, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useLeagueStore } from "@/store/useLeague";

const leagueStore = useLeagueStore();

// const { name, counter, league } = storeToRefs(leagueStore)
// function add(value) {
//   leagueStore.$patch({
//     counter: counter.value + value
//   })
// }
//  function add2(value) {
//   leagueStore.$patch((state) => (state.counter += value));
// }

// function reset() {
//   leagueStore.$reset();
// }

const { leagueId, league, matchups, rosters, sportState, users } = storeToRefs(leagueStore);

// League
leagueStore.getLeagueInfo();
// Matchups
leagueStore.getLeagueMatchups();
// Roster
leagueStore.getLeagueRosters();
// User
leagueStore.getLeagueUsers();
// NFL State
leagueStore.getSportState();
// Standings
leagueStore.getLeagueStandings();

setTimeout(() => {
  /*
    // console.log('leagueStore.users', leagueStore.users);
    console.log('leagueStore.league 1', leagueStore.league);
    console.log('leagueStore.league 11', toRaw(leagueStore.league));
    console.log('leagueStore.league 2', leagueStore.league.name);
    console.log('leagueStore.league 21', toRaw(leagueStore.league.name));

    // console.log('leagueStore.users 2', toRaw(leagueStore.users));
    // console.log('leagueStore.users 21', toRaw(leagueStore.users['204301500732678144'].display_name));
    // console.log('leagueStore.users 3', toRaw(useLeagueStore().users));
    //*
  // console.log('users', users);
  // console.log('users', users['204301500732678144'].display_name);
  // console.log('users 2', toRaw(users['204301500732678144'].display_name));
  // console.log('leagueStore.league1', league);
  // console.log('leagueStore.league2', league.value);
  // console.log('leagueStore.league3', league.name);
  // console.log('leagueStore.league4', league.value.name);
  // console.log('leagueStore.league4', leagueStore.league.name);
  // console.log('leagueStore.league5', leagueStore.league.value.name);
  // leagueStore.getLeagueInfo('529745461166530560');
  getLeagueInfo('529745461166530560')
  getLeagueRosters('529745461166530560')
  getLeagueUsers('529745461166530560')
  getLeagueMatchups('529745461166530560')
  getSportState('nfl')
}, 5000);

let nameInfo = ref({ name: "Chris", age: 29 });
//*/
</script>

<style>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
