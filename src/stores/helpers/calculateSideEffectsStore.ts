import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts'
import { useAntStore } from '@/stores/antStore.ts'

export const useCalculateSideEffectStore = defineStore('calculateSideEffect', () => {
  const laboratoryStore = useLaboratoryStore()
  const antStore = useAntStore()

  const leavesPerSecond = computed(() => {
    let sideEffects = 1 * laboratoryStore.workerStrength

    if (laboratoryStore.mushrooms > 0) {
      sideEffects = laboratoryStore.mushrooms / 100 * laboratoryStore.mushroomEffect
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
    let sideEffects = laboratoryStore.mushroomWorkersUnlocked ? antStore.leaves / 50000 : 0
    sideEffects = Math.log(sideEffects + 1)

    return laboratoryStore.mushroomRate * (1 + sideEffects)
  })

  let interval: number | null = null

  const startMushroomProduction = () => {
    if (!interval) {
      interval = setInterval(() => {
        laboratoryStore.mushrooms += mushroomsPerSecond.value
        laboratoryStore.saveToLocalStorage()
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
