import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { calculateLevel, calculateUpgradeCost } from './utils/costPrice.ts'

export const useLaboratoryStore = defineStore('laboratory', () => {
  const mushrooms = ref(0)

  const mushroomRate = ref(1)
  const mushroomRateBasePrice = 10
  const mushroomRatePriceMultiplier = 1.2

  const mushroomEffect = ref(1)
  const mushroomEffectBasePrice = 100
  const mushroomEffectPriceMultiplier = 1.2
  const mushroomEffectValueMultiplier = 1.25

  const workerStrength = ref(1)
  const workerStrengthBasePrice = 200
  const workerStrengthPriceMultiplier = 1.8
  const workerStrengthValueMultiplier = 3

  const mediaWorkersUnlocked = ref(false)
  const mediaWorkerCost = 1000

  const mushroomWorkersUnlocked = ref(false)
  const mushroomWorkerCost = 2000

  const majorWorkersUnlocked = ref(false)
  const majorWorkerCost = 5000

  const mushroomRateUpgradeCost = computed(() => {
    return calculateUpgradeCost(
      mushroomRateBasePrice,
      mushroomRatePriceMultiplier,
      mushroomRate.value,
    )
  })

  const mushroomEffectUpgradeCost = computed(() =>
    calculateUpgradeCost(
      mushroomEffectBasePrice,
      mushroomEffectPriceMultiplier,
      calculateLevel(mushroomEffect.value, mushroomEffectValueMultiplier) + 1,
    ),
  )

  const workerStrengthUpgradeCost = computed(() =>
    calculateUpgradeCost(
      workerStrengthBasePrice,
      workerStrengthPriceMultiplier,
      calculateLevel(workerStrength.value, workerStrengthValueMultiplier) + 1,
    ),
  )

  const loadFromLocalStorage = () => {
    const savedMushrooms = localStorage.getItem('mushrooms')
    const savedMushroomRate = localStorage.getItem('mushroomRate')
    const savedMushroomEffect = localStorage.getItem('mushroomEffect')
    const savedWorkerStrength = localStorage.getItem('workerStrength')
    const savedMediaWorkersUnlocked = localStorage.getItem('mediaWorkersUnlocked')
    const savedMushroomWorkersUnlocked = localStorage.getItem('mushroomWorkersUnlocked')
    const savedMajorWorkersUnlocked = localStorage.getItem('majorWorkersUnlocked')

    if (savedMushrooms) mushrooms.value = parseInt(savedMushrooms)
    if (savedMushroomRate) mushroomRate.value = parseInt(savedMushroomRate)
    if (savedMushroomEffect) mushroomEffect.value = parseFloat(savedMushroomEffect)
    if (savedWorkerStrength) workerStrength.value = parseFloat(savedWorkerStrength)
    if (savedMediaWorkersUnlocked) mediaWorkersUnlocked.value = savedMediaWorkersUnlocked === 'true'
    if (savedMushroomWorkersUnlocked)
      mushroomWorkersUnlocked.value = savedMushroomWorkersUnlocked === 'true'
    if (savedMajorWorkersUnlocked) majorWorkersUnlocked.value = savedMajorWorkersUnlocked === 'true'
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('mushrooms', mushrooms.value.toString())
    localStorage.setItem('mushroomRate', mushroomRate.value.toString())
    localStorage.setItem('mushroomEffect', mushroomEffect.value.toString())
    localStorage.setItem('workerStrength', workerStrength.value.toString())
    localStorage.setItem('mediaWorkersUnlocked', mediaWorkersUnlocked.value.toString())
    localStorage.setItem('mushroomWorkersUnlocked', mushroomWorkersUnlocked.value.toString())
    localStorage.setItem('majorWorkersUnlocked', majorWorkersUnlocked.value.toString())
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
      mushroomEffect.value *= mushroomEffectValueMultiplier

      saveToLocalStorage()
    }
  }

  const increaseWorkerStrength = () => {
    if (mushrooms.value >= workerStrengthUpgradeCost.value) {
      mushrooms.value -= workerStrengthUpgradeCost.value
      workerStrength.value *= workerStrengthValueMultiplier
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

  const unlockMajorWorkers = () => {
    if (mushrooms.value >= majorWorkerCost && !majorWorkersUnlocked.value) {
      mushrooms.value -= majorWorkerCost
      majorWorkersUnlocked.value = true
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
    majorWorkersUnlocked,
    loadFromLocalStorage,
    saveToLocalStorage,
    increaseMushroomRate,
    increaseMushroomEffect,
    increaseWorkerStrength,
    unlockMediaWorkers,
    unlockMushroomWorkers,
    unlockMajorWorkers,
  }
})
