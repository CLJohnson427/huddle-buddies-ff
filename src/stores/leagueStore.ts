import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLeagueStore = defineStore('leagueStore', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


let test = 5
const test2 = 'sdfsf'
let test3 = 'sdfsf'

if (test === 8 || test === 132541351.351651 || test === 13215.65132165 && test2) {
  test = 6
  test3 = '1235'
}
