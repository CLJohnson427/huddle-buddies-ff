<template>
  <div class="matchup">
    <div class="header">
      <!-- Away Opponent -->
      <div class="opponent away">
        <img class="avatar" src="" alt="Away Team Avatar" >
        <div class="name">Away Team</div>
        <div class="totalPoints totalPointsLeft">
          0.00
          <div class="totalProjection">0.00</div>
        </div>
      </div>

      <!-- Home Opponent -->
      <div class="opponent home">
        <div class="totalPoints totalPointsRight">
          0.00
          <div class="totalProjection">0.00</div>
        </div>
        <div class="name">Home Team</div>
        <img class="avatar" src="" alt="Home Team Avatar" >
      </div>
    </div>
  </div>

  <div>{{ matchup1 }}</div>
  <br><hr><br>
  <div>{{ matchup2 }}</div>
  <br><hr><br>
  <div>{{ matchup3 }}</div>
  <br><hr><br>
  <div>{{ matchup4 }}</div>
  <br><hr><br>
  <div>{{ matchup5 }}</div>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getMatchupsInLeagueByWeek } from '@/utilities/Matchup.js'

export default {
  name: 'Matchup',
  props: ['week'],
  async setup(props) {
    const store = useStore()

    // console.log('getMatchupsInLeagueByWeek', await getMatchupsInLeagueByWeek(store.state.leagueId, props.week))
    let matchups = await getMatchupsInLeagueByWeek(store.state.leagueId, props.week)
    console.log('getMatchupsInLeagueByWeek', matchups)


    //*/
    const matchup1 = computed(() => {
      return matchups.filter((matchup) => { return matchup.matchup_id == 1 })
    })
    console.log('matchup1', matchup1.value)

    const matchup2 = computed(() => {
      return matchups.filter((matchup) => { return matchup.matchup_id == 2 })
    })
    console.log('matchup2', matchup2.value)

    const matchup3 = computed(() => {
      return matchups.filter((matchup) => { return matchup.matchup_id == 3 })
    })
    console.log('matchup3', matchup3.value)

    const matchup4 = computed(() => {
      return matchups.filter((matchup) => { return matchup.matchup_id == 4 })
    })
    console.log('matchup4', matchup4.value)

    const matchup5 = computed(() => {
      return matchups.filter((matchup) => { return matchup.matchup_id == 5 })
    })
    console.log('matchup5', matchup5.value)



    // Not Supported in IE 6-11

    // const ids = matchups.map((matchup) => {
    //   return matchup.matchup_id;
    // })
    // console.log(ids); // 👉️ [1, 7, 3, 14]

    // const maxMatchupId = Math.max(...ids);
    // console.log(maxMatchupId); // 👉️ 14

    // for (let i = 1; i <= maxMatchupId; i++) {
    //   const managerRoster = computed(() => {
    //     return store.state.rosters.find((roster) => { return roster.owner_id == props.user.user_id })
    //   })
      
    // }

    //*/

    return {
      // matchups
      matchup1, matchup2, matchup3, matchup4, matchup5
    }
  }
}
</script>

<style lang="scss">
.matchup {
  width: 95%;
  max-width: 600px;
  margin: 10px auto;

  .header {
    display: flex;
    justify-content: space-between;
    position: relative;
    border: 1px solid #bbb;
    border-radius: 10px;
    opacity: .8;
    cursor: pointer;
    transition: opacity .5s;
    overflow: hidden;
  }

  .opponent {
    display: flex;
    align-items: center;
    width: 50%;
    padding: 5px 2%;
    top: 0;
    z-index: 2;
  }

  .away {
    justify-content: flex-start;
    left: 0;
    text-align: left;
    background-color: #485566;
  }

  .home {
    justify-content: flex-end;
    right: 0;
    text-align: right;
    background-color: #8b6969;
  }

  .avatar {
    vertical-align: middle;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    margin: 0;
    border: .25px solid #777;
    background-color: #eee;
  }

  .name {
    margin: 0 5px;
    font-size: 1em;
    line-height: 1.1em;
    flex-grow: 1;
    word-break: break-word;
    color: #fff;
    font-style: italic;
  }

  .totalPoints {
    line-height: 1.1em;
    color: #fff;
  }

  .totalPointsLeft {
    margin-left: .1em;
    text-align: left;
  }

  .totalPointsRight {
    margin-right: .1em;
    text-align: right;
  }

  .totalProjection {
    color: #ccc;
    font-size: .7em;
    font-style: italic;
  }
}
</style>