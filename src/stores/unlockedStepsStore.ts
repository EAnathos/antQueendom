// stores/unlockedStepsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAntStore } from '@/stores/antStore.ts'

export const useUnlockedStepStore = defineStore('unlockedSteps', () => {
  const labUnlocked = ref(false)
  const offenseAndDefenseUnlocked = ref(false)

  const antStore = useAntStore()

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedLabUnlocked = localStorage.getItem('labUnlocked')
    const savedOffenseAndDefenseUnlocked = localStorage.getItem('offenseAndDefenseUnlocked')

    if (savedLabUnlocked) labUnlocked.value = savedLabUnlocked === 'true'
    if (savedOffenseAndDefenseUnlocked) offenseAndDefenseUnlocked.value = savedOffenseAndDefenseUnlocked === 'true'
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('labUnlocked', labUnlocked.value.toString())
    localStorage.setItem('offenseAndDefenseUnlocked', offenseAndDefenseUnlocked.value.toString())
  }

  // Unlock the laboratory
  const unlockLab = () => {
    if (antStore.leaves >= 1000) {
      labUnlocked.value = true
      antStore.leaves -= 1000

      saveToLocalStorage()
    }
  }

  const unlockOffenseAndDefense = () => {
    if (antStore.leaves >= 500000) {
      offenseAndDefenseUnlocked.value = true
      antStore.leaves -= 500000

      saveToLocalStorage()
      }
  }

  return { labUnlocked, offenseAndDefenseUnlocked, unlockLab, unlockOffenseAndDefense, loadFromLocalStorage, saveToLocalStorage }
})
