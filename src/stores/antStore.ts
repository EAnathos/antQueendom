// stores/antStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateUpgradeCost } from '@/stores/utils/costPrice.ts'

export const useAntStore = defineStore('ant', () => {
  const leaves = ref(0)

  const workers = ref(0)
  const workerBasePrice = 10
  const workerPriceMultiplier = 1.2

  const workerCost = computed(() => {
    return calculateUpgradeCost(workerBasePrice, workerPriceMultiplier, workers.value + 1)
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
      saveToLocalStorage()
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
