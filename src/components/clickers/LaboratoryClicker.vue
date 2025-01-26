<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts'
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useCalculateSideEffectStore } from '@/stores/helpers/calculateSideEffectsStore.ts'

const laboratoryStore = useLaboratoryStore()
const unlockedStepStore = useUnlockedStepStore()

const calculateSideEffectStore = useCalculateSideEffectStore()

onMounted(() => {
  laboratoryStore.loadFromLocalStorage()

  if (unlockedStepStore.labUnlocked) {
    calculateSideEffectStore.startMushroomProduction()
  }
})

watch(
  () => unlockedStepStore.labUnlocked,
  (newVal) => {
    if (newVal) {
      calculateSideEffectStore.startMushroomProduction()
    } else {
      calculateSideEffectStore.stopMushroomProduction()
    }
  },
)
</script>

<template>
  <div v-if="unlockedStepStore.labUnlocked" class="game-container">
    <div class="banner">
      <p>Laboratory</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">
        You have
        {{
          laboratoryStore.mushrooms > 1000
            ? Math.round(laboratoryStore.mushrooms)
            : laboratoryStore.mushrooms.toFixed(2)
        }}
        mushrooms
      </p>
      <p class="rate-display">
        (+{{
          laboratoryStore.mushrooms > 10000
            ? Math.round(calculateSideEffectStore.mushroomsPerSecond)
            : calculateSideEffectStore.mushroomsPerSecond.toFixed(2)
        }}
        mushrooms/s)
      </p>

      <button
        @click="laboratoryStore.increaseMushroomRate()"
        :disabled="laboratoryStore.mushrooms < laboratoryStore.mushroomRateUpgradeCost"
      >
        <span>Increase Mushroom Rate</span>
        <span>Current : {{ laboratoryStore.mushroomRate }} mushrooms/s</span>
        <span>Cost : {{ laboratoryStore.mushroomRateUpgradeCost }} mushrooms</span>
      </button>

      <button
        @click="laboratoryStore.increaseMushroomEffect()"
        :disabled="laboratoryStore.mushrooms < laboratoryStore.mushroomEffectUpgradeCost"
      >
        <span>Increase Mushroom Effect</span>
        <span>Current : x{{ laboratoryStore.mushroomEffect.toFixed(2) }} leaves/s</span>
        <span>Cost : {{ laboratoryStore.mushroomEffectUpgradeCost.toFixed(2) }} mushrooms</span>
      </button>

      <button
        @click="laboratoryStore.increaseWorkerStrength()"
        :disabled="laboratoryStore.mushrooms < laboratoryStore.workerStrengthUpgradeCost"
      >
        <span>Increase Worker Strength</span>
        <span>Current : x{{ laboratoryStore.workerStrength.toFixed(2) }} worker strength</span>
        <span>Cost : {{ laboratoryStore.workerStrengthUpgradeCost.toFixed(2) }} mushrooms</span>
      </button>

      <button
        @click="laboratoryStore.unlockMediaWorkers()"
        :disabled="
          laboratoryStore.mushrooms < laboratoryStore.mediaWorkerCost ||
          laboratoryStore.mediaWorkersUnlocked
        "
      >
        <template v-if="laboratoryStore.mediaWorkersUnlocked">
          <span>Media Workers Unlocked</span>
          <span>Double your leaf production</span>
        </template>
        <template v-else>
          <span>Unlock Media Workers</span>
          <span>Doubles your leaf production</span>
          <span>Cost: {{ laboratoryStore.mediaWorkerCost }} mushrooms</span>
        </template>
      </button>

      <button
        @click="laboratoryStore.unlockMushroomWorkers()"
        :disabled="
          laboratoryStore.mushrooms < laboratoryStore.mushroomWorkerCost ||
          laboratoryStore.mushroomWorkersUnlocked
        "
      >
        <template v-if="laboratoryStore.mushroomWorkersUnlocked">
          <span>Mushroom Workers Unlocked</span>
          <span>Leaves upgrade Mushrooms/second</span>
        </template>
        <template v-else>
          <span>Unlock Mushroom Workers</span>
          <span>Leaves upgrade Mushrooms/second</span>
          <span>Cost: {{ laboratoryStore.mushroomWorkerCost }} mushrooms</span>
        </template>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/clicker.css';

.game-container {
  width: 400px;
}

.banner {
  background-color: #1e475c;
}
</style>
