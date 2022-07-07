<template>
  <aside class="sidebarNav" :class="`${expandedMenu ? 'expanded-menu' : ''}`">
    <div class="logo">
      <img alt="Huddle Buddies Logo" src="@/assets/huddle-buddies-thumbnail.png" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <Icon class="material-icons" icon="mdi:chevron-double-right" />
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link :to="{ name: 'Home' }" class="button">
        <Icon class="material-icons" icon="mdi:home" />
        <span class="text">Home</span>
      </router-link>
      <router-link :to="{ name: 'Charts' }" class="button">
        <Icon class="material-icons" icon="mdi:chart-areaspline" />
        <span class="text">Charts</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link :to="{ name: 'Home' }" class="button">
        <Icon class="material-icons" icon="mdi:home" />
        <span class="text">Home</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const expandedMenu = ref(localStorage.getItem('expandedMenu') === 'true')

function toggleMenu() {
  expandedMenu.value = !expandedMenu.value;
  localStorage.setItem('expandedMenu', expandedMenu.value)
} 

</script>

<style lang="scss">
.sidebarNav {
  // border-right: 1px solid #000;

  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  // width: calc(2rem + 32px); // 32px is width of icon (2rem).
  width: 8rem;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: var(--dark-alt);

        .material-icons, .text {
          color: var(--primary);
        }
      }
      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons, .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.expanded-menu {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3, .button, .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>