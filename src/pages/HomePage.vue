<template>
  <main class="home">
    <h1 class="text-4xl mb-4 font-bold">Huddle Buddies Fantasy Football</h1>
    <hr /><br />

    <span class="font-bold">League Year: </span>
    <select v-model="selectedLeagueId" class="text-black rounded-sm p-1">
      <option v-for="league in leagueIds" :value="league.leagueId" :key="league.leagueId">
        {{ league.year }}
      </option>
    </select>

    <br /><br />
    
    <LeagueStandingsBarChart :leagueId="selectedLeagueId" :darkMode="leagueStore.darkTheme" :height="800" :width="'100%'"
      :stackedBarChart="false" :verticalBarChart="true"
      :includeWins="true" :includeLosses="true"
      :includeMedian="true" :combineMedian="false"
    >
    </LeagueStandingsBarChart>

    <br /><hr /><br />

    <WeeklyStandingsLineChart :leagueId="selectedLeagueId" :darkMode="leagueStore.darkTheme"
      :height="800" :width="'100%'">
    </WeeklyStandingsLineChart>

    <br /><hr /><br />

    <LeaguePointsLineChart :leagueId="selectedLeagueId" :darkMode="leagueStore.darkTheme"
      :height="800" :width="'100%'">
    </LeaguePointsLineChart>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useLeagueStore } from "@/store/useLeague.js";
import { leagueIds, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let selectedLeagueId = ref(getMostRecentLeagueInfo('id'));
</script>

<style>

</style>
