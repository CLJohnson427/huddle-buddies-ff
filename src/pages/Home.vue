<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <h1>This is the home page</h1>


    <!-- <h4>{{ name }}</h4>
    <h4>{{ counter }}</h4>
    <button @click="add(1)">Increment 1</button>
    <button @click="add2(10)">Increment 10</button>
    <button @click="reset">Reset</button> -->
    <h4>{{ league }}</h4>
  </div>
</template>

<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import HelloWorld from '../components/HelloWorld.vue'
  import { storeToRefs } from 'pinia'
  import { useLeagueStore } from '@/store/useLeague'

  const store = useLeagueStore();

  // const { name, counter, league } = storeToRefs(store)
  // function add(value) {
  //   store.$patch({
  //     counter: counter.value + value
  //   })
  // }
  //  function add2(value) {
  //   store.$patch((state) => (state.counter += value));
  // }

  // function reset() {
  //   store.$reset();
  // }

  const { leagueId, league, matchups, rosters, sportState, users } = storeToRefs(store)

  // League
  store.getLeagueInfo()
  // Matchups
  store.getLeagueMatchups()
  // Roster
  store.getLeagueRosters();
  // User
  store.getLeagueUsers();
  // NFL State
  store.getSportState();

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
