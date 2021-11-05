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
</template>

<script>
export default {
  name: 'Matchup',
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