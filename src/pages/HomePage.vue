<template>
  <main class="home">
    <div class="flex mb-2">
      <img
        src="@/assets/huddle-buddies-thumbnail.png"
        alt="Huddle Buddies Logo"
        class="hidden md:flex"
      >
      <h1 class="text-4xl mb-4 font-bold flex justify-center items-center w-11/12">
        Huddle Buddies Fantasy Football
      </h1>
      <div
        class="flex justify-center items-center w-1/12"
        @click="leagueStore.changeTheme()"
      >
        <Icon
          v-if="leagueStore.darkTheme"
          class="text-white"
          icon="mdi:brightness-7"
          height="32"
          width="32"
        />
        <Icon
          v-else
          class="text-black"
          icon="mdi:brightness-4"
          height="32"
          width="32"
        />
      </div>
    </div>
    <hr><br>

    <span class="font-bold">League Year: </span>
    <select
      v-model="selectedLeagueId"
      class="text-black rounded-sm p-1"
    >
      <option
        v-for="league in leagueIds"
        :key="league.leagueId"
        :value="league.leagueId"
      >
        {{ league.year }}
      </option>
    </select>
    <br><br>

    <!-- <div v-if="leagueChampion">
      <span class="font-bold">League Champion: {{ leagueChampion.managerName }} | {{ leagueChampion.teamName }}</span>
      <br><br>
    </div> -->
    
    <LeagueStandingsBarChart
      :league-id="selectedLeagueId"
      :dark-mode="leagueStore.darkTheme"
      :chart-height="800"
      :chart-width="'100%'"
      :stacked-bar-chart="false"
      :vertical-bar-chart="true"
      :include-wins="true"
      :include-losses="true"
      :include-median="true"
      :combine-median="false"
    />

    <br><hr><br>

    <WeeklyStandingsLineChart
      :league-id="selectedLeagueId"
      :dark-mode="leagueStore.darkTheme"
      :chart-height="800"
      :chart-width="'100%'"
      :include-chart-markers="false"
    />

    <br><hr><br>

    <LeaguePointsLineChart
      :league-id="selectedLeagueId"
      :dark-mode="leagueStore.darkTheme"
      :chart-height="800"
      :chart-width="'100%'"
      :include-chart-markers="true"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { Icon } from '@iconify/vue';
import { useLeagueStore } from '@/store/useLeague';
import { leagueIds, getMostRecentLeagueInfo } from '@/data/sleeper/leagueInfo';
import { getLeagueChampion } from '@/data/sleeper/playoffBrackets';

// Setup the leagueStore.
const leagueStore = useLeagueStore();

// Setup Refs
const selectedLeagueId = ref(getMostRecentLeagueInfo('id'));
const leagueChampion = ref();


async function getChampion(leagueId: string) {
  await leagueStore.getLeagueChampion(selectedLeagueId.value.toString());
  if (leagueStore.leagueChampion) {
    leagueChampion.value = leagueStore.leagueChampion;
  }
}

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  await getChampion(selectedLeagueId.value as string);
});

watch(selectedLeagueId, async (selectedLeagueId) => {
  await getChampion(selectedLeagueId as string);
});
</script>

<style>

</style>
