// stores/laboratoryStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLaboratoryStore = defineStore('laboratory', () => {
  const mushrooms = ref(0)
  const mushroomRate = ref(1)
  const mushroomRateUpgradeCost = ref(20)

  const mushroomEffect = ref(1)
  const mushroomEffectUpgradeCost = ref(100)

  const workerStrength = ref(1)
  const workerStrengthUpgradeCost = ref(100)

  const mediaWorkersUnlocked = ref(false)
  const mediaWorkerCost = 500

  const mushroomWorkersUnlocked = ref(false)
  const mushroomWorkerCost = 1000

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedMushrooms = localStorage.getItem('mushrooms')
    const savedMushroomRate = localStorage.getItem('mushroomRate')
    const savedMushroomRateUpgradeCost = localStorage.getItem('mushroomRateUpgradeCost')
    const savedMushroomEffect = localStorage.getItem('mushroomEffect')
    const savedMushroomEffectUpgradeCost = localStorage.getItem('mushroomEffectUpgradeCost')
    const savedWorkerStrength = localStorage.getItem('workerStrength')
    const savedWorkerStrengthUpgradeCost = localStorage.getItem('workerStrengthUpgradeCost')
    const savedMediaWorkersUnlocked = localStorage.getItem('mediaWorkersUnlocked')
    const savedMushroomWorkersUnlocked = localStorage.getItem('mushroomWorkersUnlocked')

    if (savedMushrooms) mushrooms.value = parseInt(savedMushrooms, 10)
    if (savedMushroomRate) mushroomRate.value = parseInt(savedMushroomRate, 10)
    if (savedMushroomRateUpgradeCost)
      mushroomRateUpgradeCost.value = parseInt(savedMushroomRateUpgradeCost, 10)
    if (savedMushroomEffect) mushroomEffect.value = parseInt(savedMushroomEffect, 10)
    if (savedMushroomEffectUpgradeCost)
      mushroomEffectUpgradeCost.value = parseInt(savedMushroomEffectUpgradeCost, 10)
    if (savedWorkerStrength) workerStrength.value = parseInt(savedWorkerStrength, 10)
    if (savedWorkerStrengthUpgradeCost)
      workerStrengthUpgradeCost.value = parseInt(savedWorkerStrengthUpgradeCost, 10)
    if (savedMediaWorkersUnlocked) mediaWorkersUnlocked.value = savedMediaWorkersUnlocked === 'true'
    if (savedMushroomWorkersUnlocked)
      mushroomWorkersUnlocked.value = savedMushroomWorkersUnlocked === 'true'
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('mushrooms', mushrooms.value.toString())
    localStorage.setItem('mushroomRate', mushroomRate.value.toString())
    localStorage.setItem('mushroomRateUpgradeCost', mushroomRateUpgradeCost.value.toString())
    localStorage.setItem('mushroomEffect', mushroomEffect.value.toString())
    localStorage.setItem('mushroomEffectUpgradeCost', mushroomEffectUpgradeCost.value.toString())
    localStorage.setItem('workerStrength', workerStrength.value.toString())
    localStorage.setItem('workerStrengthUpgradeCost', workerStrengthUpgradeCost.value.toString())
    localStorage.setItem('mediaWorkersUnlocked', mediaWorkersUnlocked.value.toString())
    localStorage.setItem('mushroomWorkersUnlocked', mushroomWorkersUnlocked.value.toString())
  }

  const increaseMushroomRate = () => {
    if (mushrooms.value >= mushroomRateUpgradeCost.value) {
      mushroomRate.value++
      mushrooms.value -= mushroomRateUpgradeCost.value
      mushroomRateUpgradeCost.value = Math.ceil(mushroomRateUpgradeCost.value * 1.2)

      saveToLocalStorage()
    }
  }

  const increaseMushroomEffect = () => {
    if (mushrooms.value >= mushroomEffectUpgradeCost.value) {
      mushroomEffect.value *= 1.05
      mushrooms.value -= mushroomEffectUpgradeCost.value
      mushroomEffectUpgradeCost.value *= 1.2

      saveToLocalStorage()
    }
  }

  const increaseWorkerStrength = () => {
    if (mushrooms.value >= workerStrengthUpgradeCost.value) {
      mushrooms.value -= workerStrengthUpgradeCost.value
      workerStrength.value *= 1.4
      workerStrengthUpgradeCost.value *= 1.8
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
