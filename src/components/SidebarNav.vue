<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-logo">
        <router-link :to="{ name: 'Home' }" class="nav-logo-link">
          <img alt="Huddle Buddies Logo" src="@/assets/huddle-buddies-thumbnail.png" />
          <span class="nav-link-text nav-logo-text">
            Huddle Buddies
          </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Home' }" class="nav-link">
          <Icon class="nav-icon" icon="mdi:home" height="32" width="32"/>
          <span class="nav-link-text">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Charts' }" class="nav-link">
          <Icon class="nav-icon" icon="mdi:chart-areaspline" height="32" width="32" />
          <span class="nav-link-text">Charts</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'About' }" class="nav-link">
          <Icon class="nav-icon" icon="mdi:information" height="32" width="32" />
          <span class="nav-link-text">About</span>
        </router-link>
      </li>
      <div class="nav-bottom-section">
        <li class="nav-item">
          <router-link :to="{ name: 'Github' }" class="nav-link" target="_blank">
          <Icon class="nav-icon" icon="mdi:github" height="32" width="32" />
          <span class="nav-link-text">Source Code</span>
        </router-link>
        </li>
        <li class="nav-item">
          <div class="nav-link" @click="leagueStore.changeTheme()">
            <Icon v-if="leagueStore.darkTheme"
              class="nav-icon" icon="mdi:brightness-7" height="32" width="32"
            />
            <Icon v-else
              class="nav-icon" icon="mdi:brightness-4" height="32" width="32"
            />
            <span v-if="leagueStore.darkTheme" class="nav-link-text">Light Theme</span>
            <span v-else class="nav-link-text">Dark Theme</span>
          </div>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useLeagueStore } from "@/store/useLeague.js";

// Setup the leagueStore.
const leagueStore = useLeagueStore();
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  background-color: var(--sidebar-bg-primary);
  transition: width 200ms ease;
  width: var(--sidebar-width);
  height: 100vh;
  z-index: 50;
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.nav-item {
  width: 100%;
}

// .nav-item:last-child {
//   margin-top: auto;
// }
.nav-bottom-section {
  margin-top: auto;
  width: 100%;
}

.nav-link {
  display: flex;
  align-items: center;
  height: 4rem;
  color: var(--sidebar-text-primary);
  text-decoration: none;
  filter: grayscale(100%) opacity(0.7);
  transition: var(--transition-speed);
}

.nav-link:hover,
.router-link-exact-active{
  filter: grayscale(0%) opacity(1);
  background: var(--sidebar-bg-active);
  color: var(--sidebar-text-secondary);
}

.nav-logo-link {
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--sidebar-text-primary);
  text-decoration: none;
  filter: grayscale(0%) opacity(1);
  transition: var(--transition-speed);
}

.nav-link-text {
  display: none;
  margin-left: 1rem;
}

.nav-logo {
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  color: var(--sidebar-text-secondary);
  background: var(--sidebar-bg-active);
  font-size: 1.2rem;
  width: 100%;
}

// .nav-logo svg {
//   transform: rotate(0deg);
//   transition: var(--transition-speed);
// }
// .navbar:hover .nav-logo svg {
//   transform: rotate(-180deg);
// }

.nav-link svg {
  // width: 2rem;
  // min-width: 2rem;
  margin: 0 1.5rem;
}

.nav-icon {
  color: var(--sidebar-icon-primary);
}

.nav-icon {
  transition: var(--transition-speed);
}

// /* Small screens */
// @media only screen and (max-width: 600px) {
//   .navbar {
//     bottom: 0;
//     width: 100vw;
//     height: 5rem;
//   }

//   .nav-logo {
//     display: none;
//   }

//   .navbar-nav {
//     flex-direction: row;
//   }

//   .nav-link {
//     justify-content: center;
//   }

//   main {
//     margin: 0;
//   }
// }

/* Large screens */
@media only screen and (min-width: 600px) {
  // .navbar {
  //   top: 0;
  //   width: 5rem;
  //   height: 100vh;
  // }

  .navbar:hover {
    width: 17rem;
  }

  .navbar:hover .nav-link-text {
    display: inline;
  }
}
</style>