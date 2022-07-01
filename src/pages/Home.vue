<template>
  <div class="home">
    <img alt="Huddle Buddies logo" src="../assets/huddle-buddies-thumbnail.png" />
    <h1>Huddle Buddies Dynasty Fantasy Football</h1>
    <hr /><br />

    <span>League Year: </span>
    <select v-model="selectedLeagueId">
      <option v-for="league in leagueIds" :value="league.leagueId" :key="league.leagueId">
        {{ league.year }}
      </option>
    </select>

    <br /><br />
    
    <LeagueStandingsBarChart :leagueId="selectedLeagueId" :darkMode="false" :height="800" :width="'100%'"
      :stackedBarChart="false" :verticalBarChart="true"
      :includeWins="true" :includeLosses="true"
      :includeMedian="true" :combineMedian="false"
    >
    </LeagueStandingsBarChart>

    <br /><hr /><br />

    <WeeklyStandingsLineChart :leagueId="selectedLeagueId" :darkMode="false"
      :height="800" :width="'100%'">
    </WeeklyStandingsLineChart>

    <br /><hr /><br />

    <LeaguePointsLineChart :leagueId="selectedLeagueId" :darkMode="false"
      :height="800" :width="'100%'">
    </LeaguePointsLineChart>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { useLeagueStore } from "@/store/useLeague.js";
import { leagueIds, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Setup the leagueStore.
// const leagueStore = useLeagueStore();

// Setup Chart Refs
let selectedLeagueId = ref(getMostRecentLeagueInfo('id'));
</script>

<style>

</style>
