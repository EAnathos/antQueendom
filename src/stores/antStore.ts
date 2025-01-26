// stores/antStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAntStore = defineStore('ant', () => {
  const leaves = ref(0)

  const workers = ref(0)
  const workerCost = ref(10)

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedLeaves = localStorage.getItem('leaves')

    const savedWorkers = localStorage.getItem('workers')
    const savedWorkerCost = localStorage.getItem('workerCost')

    if (savedLeaves) leaves.value = parseInt(savedLeaves, 10)

    if (savedWorkers) workers.value = parseInt(savedWorkers, 10)
    if (savedWorkerCost) workerCost.value = parseInt(savedWorkerCost, 10)
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('leaves', leaves.value.toString())

    localStorage.setItem('workers', workers.value.toString())
    localStorage.setItem('workerCost', workerCost.value.toString())
  }

  const recruitWorker = () => {
    if (leaves.value >= workerCost.value) {
      workers.value++
      leaves.value -= workerCost.value
      workerCost.value = Math.ceil(workerCost.value * 1.2)
      saveToLocalStorage()
    }
  }

  return { leaves, workers, workerCost, loadFromLocalStorage, saveToLocalStorage, recruitWorker }
})
