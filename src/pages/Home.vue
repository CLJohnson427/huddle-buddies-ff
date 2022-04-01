<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <h1>This is the home page</h1>
  </div>
</template>

<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import HelloWorld from '../components/HelloWorld.vue'
  // import { getLeagueInfo } from '../utilities/leagueInfo.js'
  import { getLeagueInfo } from '@/data/sleeper/leagueInfo.js'
  import { getLeagueRosters } from '@/data/sleeper/leagueRosters.js'
  import { getLeagueUsers } from '@/data/sleeper/leagueUsers.js'
  import { getSportState } from '@/data/sleeper/sportState.js'
  import { getLeagueMatchups } from '@/data/sleeper/leagueMatchups.js'

  console.log('getLeagueInfo', await getLeagueInfo(import.meta.env.VITE_LEAGUE_ID))
  console.log('getLeagueRosters', await getLeagueRosters(import.meta.env.VITE_LEAGUE_ID))
  console.log('getLeagueUsers', await getLeagueUsers(import.meta.env.VITE_LEAGUE_ID))
  console.log('getSportState', await getSportState())
  console.log('getLeagueMatchups', await getLeagueMatchups(import.meta.env.VITE_LEAGUE_ID))
  

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
