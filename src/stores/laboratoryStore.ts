import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const calculateUpgradeCost = (value: number, base: number, multiplier: number) => {
  return Math.ceil(base * Math.pow(multiplier, value))
}

export const useLaboratoryStore = defineStore('laboratory', () => {
  const mushrooms = ref(0)
  const mushroomRate = ref(1)
  const mushroomEffect = ref(1)
  const workerStrength = ref(1)

  const mushroomRateUpgradeCost = computed(() =>
    calculateUpgradeCost(mushroomRate.value, 10, 1.2)
  )

  const mushroomEffectUpgradeCost = computed(() =>
    calculateUpgradeCost(mushroomEffect.value, 100, 1.2)
  )

  const workerStrengthUpgradeCost = computed(() =>
    calculateUpgradeCost(workerStrength.value, 100, 1.8)
  )

  const mediaWorkersUnlocked = ref(false)
  const mediaWorkerCost = 500

  const mushroomWorkersUnlocked = ref(false)
  const mushroomWorkerCost = 1000

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedMushrooms = localStorage.getItem('mushrooms')
    const savedMushroomRate = localStorage.getItem('mushroomRate')
    const savedMushroomEffect = localStorage.getItem('mushroomEffect')
    const savedWorkerStrength = localStorage.getItem('workerStrength')
    const savedMediaWorkersUnlocked = localStorage.getItem('mediaWorkersUnlocked')
    const savedMushroomWorkersUnlocked = localStorage.getItem('mushroomWorkersUnlocked')

    if (savedMushrooms) mushrooms.value = parseInt(savedMushrooms, 10)
    if (savedMushroomRate) mushroomRate.value = parseInt(savedMushroomRate, 10)
    if (savedMushroomEffect) mushroomEffect.value = parseInt(savedMushroomEffect, 10)
    if (savedWorkerStrength) workerStrength.value = parseInt(savedWorkerStrength, 10)
    if (savedMediaWorkersUnlocked) mediaWorkersUnlocked.value = savedMediaWorkersUnlocked === 'true'
    if (savedMushroomWorkersUnlocked)
      mushroomWorkersUnlocked.value = savedMushroomWorkersUnlocked === 'true'
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('mushrooms', mushrooms.value.toString())
    localStorage.setItem('mushroomRate', mushroomRate.value.toString())
    localStorage.setItem('mushroomEffect', mushroomEffect.value.toString())
    localStorage.setItem('workerStrength', workerStrength.value.toString())
    localStorage.setItem('mediaWorkersUnlocked', mediaWorkersUnlocked.value.toString())
    localStorage.setItem('mushroomWorkersUnlocked', mushroomWorkersUnlocked.value.toString())
  }

  const increaseMushroomRate = () => {
    if (mushrooms.value >= mushroomRateUpgradeCost.value) {
      mushrooms.value -= mushroomRateUpgradeCost.value
      mushroomRate.value++

      saveToLocalStorage()
    }
  }

  const increaseMushroomEffect = () => {
    if (mushrooms.value >= mushroomEffectUpgradeCost.value) {
      mushrooms.value -= mushroomEffectUpgradeCost.value
      mushroomEffect.value *= 1.05

      saveToLocalStorage()
    }
  }

  const increaseWorkerStrength = () => {
    if (mushrooms.value >= workerStrengthUpgradeCost.value) {
      mushrooms.value -= workerStrengthUpgradeCost.value
      workerStrength.value *= 1.4
      saveToLocalStorage()
    }
  }

  const unlockMediaWorkers = () => {
    if (mushrooms.value >= mediaWorkerCost && !mediaWorkersUnlocked.value) {
      mushrooms.value -= mediaWorkerCost
      mediaWorkersUnlocked.value = true
      saveToLocalStorage()
    }
  }

  const unlockMushroomWorkers = () => {
    if (mushrooms.value >= mushroomWorkerCost && !mushroomWorkersUnlocked.value) {
      mushrooms.value -= mushroomWorkerCost
      mushroomWorkersUnlocked.value = true
      saveToLocalStorage()
    }
  }

  return {
    mushrooms,
    mushroomRate,
    mushroomRateUpgradeCost,
    mushroomEffect,
    mushroomEffectUpgradeCost,
    workerStrength,
    workerStrengthUpgradeCost,
    mediaWorkersUnlocked,
    mediaWorkerCost,
    mushroomWorkersUnlocked,
    mushroomWorkerCost,
    loadFromLocalStorage,
    saveToLocalStorage,
    increaseMushroomRate,
    increaseMushroomEffect,
    increaseWorkerStrength,
    unlockMediaWorkers,
    unlockMushroomWorkers,
  }
})
