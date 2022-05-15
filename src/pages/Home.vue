<template>
  <div class="home">
    <hr />
    <img alt="Huddle Buddies logo" src="../assets/huddle-buddies-thumbnail.png" />
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <h1>This is the home page</h1>

    <!-- <h4>{{ name }}</h4>
    <h4>{{ counter }}</h4>
    <button @click="add(1)">Increment 1</button>
    <button @click="add2(10)">Increment 10</button>
    <button @click="reset">Reset</button> -->
    <!-- <h4>{{ leagueStore.users['204301500732678144'].display_name }}</h4> -->
    <!-- <h4>{{ users['204301500732678144'].display_name }}</h4> -->
    <h4>{{ nameInfo }}</h4>
    <!-- <h4 :key="index" v-for="index in 10">{{ index }}</h4> -->
    <br /><hr /><br />
    <h4>{{ league }}</h4>
  </div>
</template>

<script setup>
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
    //*/
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
