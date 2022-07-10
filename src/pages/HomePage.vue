<template>
  <main class="home">
    <div class="flex mb-2">
      <img src="@/assets/huddle-buddies-thumbnail.png" alt="Huddle Buddies Logo" class="hidden md:flex">
      <h1 class="text-4xl mb-4 font-bold flex justify-center items-center w-11/12">Huddle Buddies Fantasy Football</h1>
      <div class="flex justify-center items-center w-1/12" @click="leagueStore.changeTheme()">
        <Icon v-if="leagueStore.darkTheme"
          class="text-white" icon="mdi:brightness-7" height="32" width="32"
        />
        <Icon v-else
          class="text-black" icon="mdi:brightness-4" height="32" width="32"
        />
      </div>
    </div>
    <hr /><br />

    <span class="font-bold">League Year: </span>
    <select v-model="selectedLeagueId" class="text-black rounded-sm p-1">
      <option v-for="league in leagueIds" :value="league.leagueId" :key="league.leagueId">
        {{ league.year }}
      </option>
    </select>

    <br /><br />
    
    <LeagueStandingsBarChart :leagueId="selectedLeagueId" :darkMode="leagueStore.darkTheme"
      :chartHeight="800" :chartWidth="'100%'"
      :stackedBarChart="false" :verticalBarChart="true"
      :includeWins="true" :includeLosses="true"
      :includeMedian="true" :combineMedian="false"
    >
    </LeagueStandingsBarChart>

    <br /><hr /><br />

    <WeeklyStandingsLineChart :leagueId="selectedLeagueId" :darkMode="leagueStore.darkTheme"
      :chartHeight="800" :chartWidth="'100%'" :includeChartMarkers="false"
    >
    </WeeklyStandingsLineChart>

    <br /><hr /><br />

    <LeaguePointsLineChart :leagueId="selectedLeagueId" :darkMode="leagueStore.darkTheme"
      :chartHeight="800" :chartWidth="'100%'" :includeChartMarkers="true"
    >
    </LeaguePointsLineChart>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useLeagueStore } from '@/store/useLeague.js';
import { leagueIds, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo.js';

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Chart Refs
let selectedLeagueId = ref(getMostRecentLeagueInfo('id'));
</script>

<style>

</style>
