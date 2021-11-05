<template>
  <div class="manager">
    <img class="photo" :src="`https://sleepercdn.com/avatars/thumbs/${user.avatar}`" />
    <div class="name">{{ user.display_name }}</div>
    <div class="team">{{ user.metadata.team_name}}</div>
     <!--<div class="spacer svelte-9hqn7f"></div> <div class="info svelte-9hqn7f"><div class="infoSlot infoTeam svelte-9hqn7f"><div class="infoIcon svelte-9hqn7f"><img class="infoImg svelte-9hqn7f" src="https://sleepercdn.com/images/team_logos/nfl/mia.png" alt="favorite team"></div></div> <div class="infoSlot svelte-9hqn7f"><div class="infoIcon svelte-9hqn7f"><img class="infoImg svelte-9hqn7f" src="/Text.png" alt="Text"></div> <div class="infoAnswer svelte-9hqn7f">Text</div></div> <div class="infoSlot infoRebuild svelte-9hqn7f"><div class="infoIcon svelte-9hqn7f"><img class="infoImg svelte-9hqn7f" src="/Win%20Now.png" alt="win now or rebuild"></div> <div class="infoAnswer svelte-9hqn7f">Win Now</div></div></div></div>
    -->

    <div class="pl-4 text-green-600 text-2xl">{{ managerRoster.settings.wins }}</div> -
    <div class="text-red-600 text-2xl">{{ managerRoster.settings.losses }}</div>
  </div>
</template>

<script>
export default {
  name: 'Manager',
  props: ['user', 'rosters'],
  computed: {
    managerRoster() {
      return this.rosters.find((roster) => { return roster.owner_id == this.user.user_id })
    }
  }
}
</script>

<style>

.manager {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 1em 0;
    /* background-color: var(--fff); */
    margin: .5em 0;
    border-radius: 2em;
    border: 1px solid #ccc;
    /* border: 1px solid var(--ccc); */
    box-shadow: 0 0 6px #bbb;
    /* box-shadow: 0 0 6px var(--bbb); */
    /* cursor: pointer; */


}

.manager .photo {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    vertical-align: middle;
    margin-left: 1em;
    /* box-shadow: 0 0 2px 1px var(--bbb); */
}

.manager .name {
    text-align: center;
    display: inline-block;
    /* color: var(--g555); */
    line-height: 1.2em;
    margin-left: 1em;
    font-weight: 700;
}

.manager .team {
    text-align: center;
    display: inline-block;
    font-style: italic;
    line-height: 1.2em;
    /* color: var(--g555); */
    font-weight: 300;
    margin-left: 1em;
}

</style>