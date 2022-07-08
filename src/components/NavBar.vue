<template>
  <div class="bg-dark-purple h-screen p-5 pt-8 relative duration-300" :class="[open ? 'w-72' : 'w-20']">
    <!-- <Icon icon="mdi:arrow-left" height="32" width="32" class="nav-icon"  /> -->
    <Icon icon="mdi:arrow-left"
      class="bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer"
      :class="[open ? '' : 'rotate-180']"
      @click="open = !open"
    />

    <!-- Logo -->
    <!-- <div class="inline-flex" :class="[open ? 'w-full' : '']"> -->
    <div class="inline-flex">
      <Icon icon="mdi:map-marker-check" class="bg-amber-300 text-black text-4xl rounded cursor-pointer block float-left mr-2" />
      <h1 class="text-white origin-left font-medium text-2xl duration-300" :class="[open ? '' : 'scale-0']">Tailwind</h1>
    </div>

    <!-- Search Bar -->
    <div class="flex items-center rounded-md bg-light-white mt-6 py-2" :class="[open ? 'px-4' : 'px-2.5']">
      <Icon icon="mdi:magnify" class="text-white text-lg block float-left cursor-pointer" :class="[open ? 'mr-2' : '']" />
      <input type="search" placeholder="Search" class="text-base bg-transparent w-full text-white focus:outline-none" :class="[open ? '' : 'hidden']" />
    </div>

    <!-- Menu Items -->
    <ul class="pt-2">
        <!-- <div class="inline-flex" :class="[open ? 'w-full' : '']"> -->
      <li v-for="menu in menus" :key="menu.title"
        class="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
        :class="[menu.spacing ? 'mt-9' : 'mt-2']"
      >
        <span class="text-2xl block float-left">
          <!-- <Icon icon="mdi:view-dashboard" /> -->
          <Icon :icon="menu.icon ? menu.icon : 'mdi:fire-circle'" />
        </span>
        <!-- <span class="text-base font-medium flex-1 duration-200" :class="[open ? '' : 'hidden']">{{ menu.title }}</span> -->
        <!-- <Icon icon="mdi:chevron-down" v-if="menu.submenu" /> -->
        <span class="text-base font-medium flex-initial duration-200" :class="[open ? '' : 'hidden']">{{ menu.title }}</span>
        <Icon icon="mdi:chevron-down"
          v-if="menu.submenu && open"
          @click="submenuOpen = !submenuOpen"
          class="ml-auto"
          :class="[submenuOpen ? 'rotate-180' : '']"
        />
      </li>
      <!-- <ul v-if="menu.submenuItems && submenuOpen && open">
        <li v-for="subMenu in menu.submenuItems" :key="subMenu.title"
          class="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
          :class="[menu.spacing ? 'mt-9' : 'mt-2']"
        >
          {{ subMenu.title }}
        </li>
      </ul> -->
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const open = ref(true);
// const submenuOpen = ref(false);

const menus = ref([
  { title: "Dashboard", icon: "mdi:view-dashboard" },
  { title: "Pages", icon: "mdi:book-open-page-variant" },
  { title: "Media", spacing: true },
  {
    title: "Projects",
    submenu: true,
    submenuItems: [
      { title: "Submenu 1" },
      { title: "Submenu 2" },
      { title: "Submenu 3" },
    ]
  },
  { title: "Analytics" },
  { title: "Inbox" },
  { title: "Profile", spacing: true },
  { title: "Settings" },
  { title: "Logout" }
]);

</script>

<style lang="scss" scoped>

</style>