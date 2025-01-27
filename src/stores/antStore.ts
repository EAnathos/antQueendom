// stores/antStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAntStore = defineStore('ant', () => {
  const leaves = ref(0)
  const workers = ref(0)

  // Coût des ouvrières comme propriété calculée
  const workerCost = computed(() => {
    return Math.ceil(10 * Math.pow(1.2, workers.value))
  })

  // Charger depuis le localStorage
  const loadFromLocalStorage = () => {
    const savedLeaves = localStorage.getItem('leaves')
    const savedWorkers = localStorage.getItem('workers')

    if (savedLeaves) leaves.value = parseInt(savedLeaves, 10)
    if (savedWorkers) workers.value = parseInt(savedWorkers, 10)
  }

  // Sauvegarder dans le localStorage
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
