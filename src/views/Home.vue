<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/huddle-buddies-thumbnail.png">

    <!-- <Matchup /> -->
    <suspense>
      <template #default>
        <Matchup :week="1" />
      </template>
      <template #fallback>
        <div>
          Loading...
        </div>
      </template>
    </suspense>

    <div class="grid grid-cols-4 gap-4">
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>09</div>
    </div>



    <div>Content 1</div>
    <!-- <Divider /> -->
    <Divider layout="vertical">
                        <b>OR</b>
                    </Divider>
    <div>Content 2</div>


    <h5>Vertical with Content</h5>
            <div class="grid grid-cols-5">
                <div class="col-5 flex align-items-center justify-content-center">
                    <div class="p-fluid">
                        <div class="field">
                            <label for="username">Username</label>
                            <InputText id="username" type="text" />
                        </div>
                        <div class="field">
                            <label for="password">Password</label>
                            <InputText id="password" type="password" />
                        </div>
                        <Button label="Login"></Button>
                     </div>
                </div>
                <div class="col-2">
                    <Divider layout="vertical">
                        <b>OR</b>
                    </Divider>
                </div>
                <div class="col-5 flex align-items-center justify-content-center">
                    <Button label="Sign Up" icon="pi pi-user-plus" class="p-button-success"></Button>
                </div>
            </div>


    <h5>Rounded Buttons</h5>
        <Button label="Primary" class="p-button-rounded" />
        <Button label="Secondary" class="p-button-rounded p-button-secondary" />
        <Button label="Success" class="p-button-rounded p-button-success" />
        <Button label="Info" class="p-button-rounded p-button-info" />
        <Button label="Warning" class="p-button-rounded p-button-warning" />
        <Button label="Help" class="p-button-rounded p-button-help" />
        <Button label="Danger" class="p-button-rounded p-button-danger" />

    <div class="card">
            <h5>Vertical</h5>
            <div class="flex">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <Divider layout="vertical" />

                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>

                <Divider layout="vertical" />

                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
            </div>
        </div>

    <hr>

    <!-- vuex basics --
    <div>Points: {{ points }}</div>
    <button @click="updatePoints(1)">Add a point</button>
    <button @click="updatePoints(-1)">Remove a point</button>
    <button @click="testAction()">getUser</button>
    <!- END vuex basics -->
  
    <div>{{ league }}</div>
    <br><hr><br>
    <div>{{ nflState }}</div>
    <br><hr><br>
    <div>{{ user }}</div>
    <br><hr><br>
    <div>{{ users }}</div>
    <br><hr><br>
    <div>{{ rosters }}</div>

    <div v-if="users && rosters">
      <div v-for="user in users" :key="user.user_id">
        <Manager :user="user" />
      </div>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Manager from '@/components/Manager.vue'
import Matchup from '@/components/Matchup.vue'
// import { getLeague, getLeagueUsers } from '@/utilities/League.js';
// import { getOwnerRosterInLeague, getRostersInLeague } from '@/utilities/Roster.js';
// import { getUserByUsername } from '@/utilities/User.js';

export default {
  name: 'Home',
  components: {
    Manager,
    Matchup
  },
  /* NerNinja Vuex Tutorial Examples
  setup() {
    const store = useStore()

    const test = ref('')

    //const points = computed(() => store.state.points)
    // const updatePoints = ((p) => {
    //   store.commit('updatePoints', p)
    // })

    const testAction = (() => {
      store.dispatch('getUser', { username: 'Airborne427' })
    })

    return {
      test,
      // points,
      // updatePoints,
      testAction
    }
  },
  // methods: {
  //   updatePoints(points) {
  //     this.$store.commit('updatePoints', points)
  //   }
  // },
  // computed: {
  //   points() {
  //     return this.$store.state.points
  //   }
  // }
  //*/

  /* Vue 3 Composition API */
  setup() {
    const store = useStore()

    // console.log('home load leagueId', store.state.leagueId)
    const leagueId = ref(process.env.VUE_APP_LEAGUE_ID)
    console.log('LeagueId', leagueId.value)

    // NFL State
    const nflState = computed(() => store.state.nflState)
    // store.dispatch('getNflState', 'nfl')
    // console.log('nflState', store.state.nflState)

    // League
    store.dispatch('getLeague', store.state.leagueId)
    const league = computed(() => store.state.league)

    // User
    store.dispatch('getUser', 'Airborne427')
    const user = computed(() => store.state.user)

    store.dispatch('getUsers', store.state.leagueId)
    const users = computed(() => store.state.users)
    
    // Roster
    store.dispatch('getRosters', store.state.leagueId)
    const rosters = computed(() => store.state.rosters)

    // console.log('Vuex Store', store.state)

    return {
      league,
      nflState,
      rosters,
      user,
      users
    }
  },
  /**/

  /* Vue 2 Options API *
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
  },
  /**/
}
</script>
