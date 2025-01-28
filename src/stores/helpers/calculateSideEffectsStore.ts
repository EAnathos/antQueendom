import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts'
import { useAntStore } from '@/stores/antStore.ts'
import {
  checkMushroomsAchievements,
} from '@/stores/utils/achievementsUnlocker.ts'

export const useCalculateSideEffectStore = defineStore('calculateSideEffect', () => {
  const laboratoryStore = useLaboratoryStore()
  const antStore = useAntStore()

  const leavesPerSecond = computed(() => {
    let sideEffects = 1 * laboratoryStore.workerStrength

    if (laboratoryStore.mushrooms > 0) {
      sideEffects = (laboratoryStore.mushrooms / 100) * laboratoryStore.mushroomEffect
      sideEffects = 1 + Math.log(sideEffects + 1)
    }

    // Doublement si les media workers sont débloqués
    sideEffects = laboratoryStore.mediaWorkersUnlocked ? sideEffects * 2 : sideEffects

    return antStore.workers * sideEffects
  })

  // Increase leaves
  const increaseLeaves = () => {
    antStore.leaves += leavesPerSecond.value
    antStore.saveToLocalStorage()
  }

  // Start mushroom production at an interval
  setInterval(increaseLeaves, 1000)

  const mushroomsPerSecond = computed(() => {
    const a = 0.5
    const b = 0.1

    let sideEffects = laboratoryStore.mushroomWorkersUnlocked ? antStore.leaves / 5000 : 0
    sideEffects = 1 + a * Math.log(sideEffects + 1) + b * sideEffects

    return laboratoryStore.mushroomRate * sideEffects
  })

  let interval: number | null = null

  const startMushroomProduction = () => {
    if (!interval) {
      interval = setInterval(() => {
        laboratoryStore.mushrooms += mushroomsPerSecond.value
        laboratoryStore.saveToLocalStorage()
        checkMushroomsAchievements(laboratoryStore.mushrooms)
      }, 1000)
    }
  }

  const stopMushroomProduction = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  return { mushroomsPerSecond, leavesPerSecond, startMushroomProduction, stopMushroomProduction }
})
