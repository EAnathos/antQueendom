// stores/unlockedStepsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAntStore } from '@/stores/antStore.ts'

export const useUnlockedStepStore = defineStore('unlockedSteps', () => {
  const labUnlocked = ref(false)
  const labPrice = 500

  const offenseAndDefenseUnlocked = ref(false)
  const offenseAndDefensePrice = 50000

  const antStore = useAntStore()

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedLabUnlocked = localStorage.getItem('labUnlocked')
    const savedOffenseAndDefenseUnlocked = localStorage.getItem('offenseAndDefenseUnlocked')

    if (savedLabUnlocked) labUnlocked.value = savedLabUnlocked === 'true'
    if (savedOffenseAndDefenseUnlocked)
      offenseAndDefenseUnlocked.value = savedOffenseAndDefenseUnlocked === 'true'
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('labUnlocked', labUnlocked.value.toString())
    localStorage.setItem('offenseAndDefenseUnlocked', offenseAndDefenseUnlocked.value.toString())
  }

  // Unlock the laboratory
  const unlockLab = () => {
    if (antStore.leaves >= labPrice) {
      labUnlocked.value = true
      antStore.leaves -= labPrice

      saveToLocalStorage()
    }
  }

  const unlockOffenseAndDefense = () => {
    if (antStore.leaves >= offenseAndDefensePrice) {
      offenseAndDefenseUnlocked.value = true
      antStore.leaves -= offenseAndDefensePrice

      saveToLocalStorage()
    }
  }

  return {
    labUnlocked,
    labPrice,
    offenseAndDefenseUnlocked,
    offenseAndDefensePrice,
    unlockLab,
    unlockOffenseAndDefense,
    loadFromLocalStorage,
    saveToLocalStorage,
  }
})
