<template>
  <div class="navbar">
    <Menubar :model="navItems" class="flex md:justify-center">
      <template #start>
        <img alt="Huddle Buddies Logo" src="../assets/huddle-buddies-thumbnail.png" height="40" class="p-mr-2">
      </template>
      <!-- <template #end>
        <InputText placeholder="Search" type="text" />
      </template> -->


      <!--
      https://codepen.io/samnorton/pen/zBYMJG
      https://codepen.io/bowersrd/pen/dwXLba
      https://itnext.io/how-to-build-a-responsive-navbar-using-flexbox-and-javascript-eb0af24f19bf
      https://coder-coder.com/responsive-navigation-bar-flexbox-vs-css-grid/
      https://www.section.io/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/
      -->
    </Menubar>
  </div>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        label: 'Home',
        to: '/',
        icon: 'pi pi-home'
      },
      {
        label: 'About',
        to: '/about',
        icon: 'pi pi-fw pi-power-off'
      },
      {
        label: 'Matchups',
        to: '/matchups',
        icon: 'pi pi-fw pi-power-off'
      }
    ]
  })
}
</script>

<style lang="sass">
// .navbar {

// }
</style>