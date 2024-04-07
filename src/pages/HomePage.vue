<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { Icon } from '@iconify/vue'
import { useLeagueStore } from '@/stores/leagueStore'
import { leagueIds, getMostRecentLeagueInfo } from '@/utils/sleeper/leagueInfo'
// import { getLeagueChampion } from '@/utils/sleeper/playoffBrackets'
import LeaguePointsLineChart from '@/components/LeaguePointsLineChart.vue'
import LeagueStandingsBarChart from '@/components/LeagueStandingsBarChart.vue'
import WeeklyStandingsLineChart from '@/components/WeeklyStandingsLineChart.vue'

// Setup the leagueStore.
const leagueStore = useLeagueStore()

// Setup Refs
const selectedLeagueId = ref(getMostRecentLeagueInfo('id'))
const leagueChampion = ref()


async function getChampion(leagueId: string) {
  // console.log(leagueId)
  await leagueStore.getLeagueChampion(selectedLeagueId.value.toString())
  if (leagueStore.leagueChampion) {
    leagueChampion.value = leagueStore.leagueChampion
  }
}

// onBeforeMount Lifecycle Hook
onBeforeMount(async () => {
  await getChampion(selectedLeagueId.value as string)
})

watch(selectedLeagueId, async (selectedLeagueId) => {
  await getChampion(selectedLeagueId as string)
})

</script>


<template>
  <section>
    <nav class="navbar">
      <img
        src="@/assets/huddle-buddies-thumbnail.png"
        alt="Huddle Buddies Logo"
      >
      <h1>
        Huddle Buddies Fantasy Football
      </h1>
      <div @click="leagueStore.changeTheme()">
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
    </nav>

    <!-- <hr class="divider"> -->
    
    <div class="leagueYear">
      <span>League Year: </span>
      <select v-model="selectedLeagueId">
        <option v-for="league in leagueIds" :key="league.leagueId" :value="league.leagueId">
          {{ league.year }}
        </option>
      </select>
    </div>

    <div v-if="leagueChampion" class="leagueChampion">
      <span>League Champion: {{ leagueChampion.managerName }} | {{ leagueChampion.teamName }}</span>
    </div>

    <LeagueStandingsBarChart
      :league-id="selectedLeagueId.toString()"
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

    <hr class="divider">

    <WeeklyStandingsLineChart
      :league-id="selectedLeagueId.toString()"
      :dark-mode="leagueStore.darkTheme"
      :chart-height="800"
      :chart-width="'100%'"
      :include-chart-markers="false"
    />

    <hr class="divider">

    <LeaguePointsLineChart
      :league-id="selectedLeagueId.toString()"
      :dark-mode="leagueStore.darkTheme"
      :chart-height="800"
      :chart-width="'100%'"
      :include-chart-markers="true"
    />

    <!--
    <br><hr><br>



    <br><hr><br>

     -->
  </section>
  <!--
  <main class="home">

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

    <div v-if="leagueChampion">
      <span class="font-bold">League Champion: {{ leagueChampion.managerName }} | {{ leagueChampion.teamName }}</span>
      <br><br>
    </div>
    
  <LeagueStandingsBarChart
    :league-id="selectedLeagueId.toString()"
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
    :league-id="selectedLeagueId.toString()"
    :dark-mode="leagueStore.darkTheme"
    :chart-height="800"
    :chart-width="'100%'"
    :include-chart-markers="false"
  />

  <br><hr><br>

  <LeaguePointsLineChart
    :league-id="selectedLeagueId.toString()"
    :dark-mode="leagueStore.darkTheme"
    :chart-height="800"
    :chart-width="'100%'"
    :include-chart-markers="true"
  />
  </main>
  -->
</template>

<style>
  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 1rem 0rem; */
    margin-bottom: 1rem;
    border-bottom: 0.1rem solid #fff;

    /* @media screen and (min-width: 960px) {
      margin: 0rem;
    } */

    & img {
      display: none;
      @media screen and (min-width: 960px) {
        display: block;
        margin: 0.5rem;
      }
    }
    & h1 {
      text-align: center;
      font-size: 2.25rem;
      line-height: 2.5rem;
      width: 100%;
    }
    & div {
      margin: 0 1rem;
    }
  }

  .leagueYear {
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
      font-weight: bold;
      margin-right: 0.5rem;
    }
    & select {
      /* padding: 0.25rem; */
      /* border-radius: 0.125rem; */
    }
  }

  .leagueChampion {
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }

  .divider {
    margin: 1rem 0rem;
    border: 0.1rem solid;
  }
</style>
