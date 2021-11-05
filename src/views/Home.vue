<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/huddle-buddies-thumbnail.png">

    <div class="text-purple-600 text-5xl">Hello TailwindCSS!</div>

    <Matchup />

    <hr>

    <div v-if="users && rosters">
      <div v-for="user in users" :key="user.user_id">
        <Manager :user="user" :rosters="rosters" />
      </div>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import Manager from '@/components/Manager.vue';
import Matchup from '@/components/Matchup.vue';
import { getLeague, getLeagueUsers } from '@/utilities/League.js';
import { getOwnerRosterInLeague, getRostersInLeague } from '@/utilities/Roster.js';
import { getUserByUsername } from '@/utilities/User.js';

export default {
  name: 'Home',
  components: {
    Manager,
    Matchup
  },
  data: () => ({
    leagueId: process.env.VUE_APP_LEAGUE_ID,
    league: null,
    leagueAvatar: null,
    rosters: null,
    user: null,
    users: null,
    apiFetchError: null
  }),
  async created() {
    console.log('onCreate')

    // League
    console.log('getLeague', await getLeague(process.env.VUE_APP_LEAGUE_ID))
    this.league = await getLeague(process.env.VUE_APP_LEAGUE_ID)

    // User
    console.log('getUserByUsername', await getUserByUsername('Airborne427'))
    this.user = await getUserByUsername('Airborne427')
    
    console.log('getLeagueUsers', await getLeagueUsers(process.env.VUE_APP_LEAGUE_ID))
    this.users = await getLeagueUsers(process.env.VUE_APP_LEAGUE_ID)

    // Roster
    console.log('getRostersInLeague', await getRostersInLeague(process.env.VUE_APP_LEAGUE_ID))
    console.log('getOwnerRosterInLeague', await getOwnerRosterInLeague(process.env.VUE_APP_LEAGUE_ID, this.user.user_id))
    this.rosters = await getRostersInLeague(process.env.VUE_APP_LEAGUE_ID)
  }
}
</script>
