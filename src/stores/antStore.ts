// stores/antStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateUpgradeCost } from '@/stores/utils/costPrice.ts'
import { useAchievementsStore } from '@/stores/achievementsStore.ts' // Import du store des achievements

export const useAntStore = defineStore('ant', () => {
  const leaves = ref(0)

  const workers = ref(0)
  const workerBasePrice = 10
  const workerPriceMultiplier = 1.2

  const workerCost = computed(() => {
    return calculateUpgradeCost(workerBasePrice, workerPriceMultiplier, workers.value)
  })

  const loadFromLocalStorage = () => {
    const savedLeaves = localStorage.getItem('leaves')
    const savedWorkers = localStorage.getItem('workers')

    if (savedLeaves) leaves.value = parseInt(savedLeaves)
    if (savedWorkers) workers.value = parseInt(savedWorkers)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('leaves', leaves.value.toString())
    localStorage.setItem('workers', workers.value.toString())
  }

  const recruitWorker = () => {
    if (leaves.value >= workerCost.value) {
      leaves.value -= workerCost.value
      workers.value++
      checkAchievements()
      saveToLocalStorage()
    }
  }

  const checkAchievements = () => {
    const achievementsStore = useAchievementsStore()

    switch (workers.value) {
      case 1:
        achievementsStore.unlockAchievement('First steps')
        break
      case 100:
        achievementsStore.unlockAchievement('Growing team')
        break
      case 10000:
        achievementsStore.unlockAchievement('Ants are coming')
        break
      case 1000000:
        achievementsStore.unlockAchievement('Ants are here')
        break
      case 100000000:
        achievementsStore.unlockAchievement('Ants are legion')
        break
    }
  }

  return {
    leaves,
    workers,
    workerCost,
    loadFromLocalStorage,
    saveToLocalStorage,
    recruitWorker,
  }
})
