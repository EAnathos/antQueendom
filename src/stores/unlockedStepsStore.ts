// stores/unlockedStepsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAntStore } from '@/stores/antStore.ts'

export const useUnlockedStepStore = defineStore('unlockedSteps', () => {
  const labUnlocked = ref(false)

  const antStore = useAntStore()

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedLabUnlocked = localStorage.getItem('labUnlocked')

    if (savedLabUnlocked) labUnlocked.value = savedLabUnlocked === 'true'
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('labUnlocked', labUnlocked.value.toString())
  }

  // Unlock the laboratory
  const unlockLab = () => {
    if (antStore.leaves >= 1000) {
      labUnlocked.value = true
      antStore.leaves -= 1000

      saveToLocalStorage()
    }
  }

  return { labUnlocked, unlockLab, loadFromLocalStorage, saveToLocalStorage }
})
