<script setup lang="ts">
import { onMounted } from 'vue'
import queenImage from '@/assets/queen.png'
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts'
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useAntStore } from '@/stores/antStore.ts'
import { useCalculateSideEffectStore } from '@/stores/helpers/calculateSideEffectsStore.ts'

const laboratoryStore = useLaboratoryStore()
const antStore = useAntStore()
const unlockedStepStore = useUnlockedStepStore()
const calculateSideEffectStore = useCalculateSideEffectStore()

const handleClick = () => {
  antStore.leaves++
}

onMounted(() => {
  antStore.loadFromLocalStorage()
  laboratoryStore.loadFromLocalStorage()
  unlockedStepStore.loadFromLocalStorage()
})
</script>

<template>
  <div class="game-container">
    <div class="banner">
      <p>Ant Queendom</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">
        You have
        {{
          antStore.leaves > 1000000
            ? antStore.leaves.toExponential(2)
            : antStore.leaves > 1000
              ? Math.round(antStore.leaves)
              : antStore.leaves.toFixed(2)
        }}
        leaves
      </p>
      <p class="rate-display">
        (+{{
          calculateSideEffectStore.leavesPerSecond > 100
            ? Math.round(calculateSideEffectStore.leavesPerSecond)
            : calculateSideEffectStore.leavesPerSecond.toFixed(2)
        }}
        leaves/s)
      </p>
      <button @click="handleClick">Collect leaves</button>
      <button @click="antStore.recruitWorker()" :disabled="antStore.leaves < antStore.workerCost">
        Recruit Worker ({{ antStore.workerCost }} leaves)
        <span>Current : {{ antStore.workers }} workers</span>
      </button>
      <button
        v-if="!unlockedStepStore.labUnlocked"
        class="unlock-button"
        @click="unlockedStepStore.unlockLab()"
        :disabled="antStore.leaves < 1000"
      >
        Unlock Lab (1000 leaves)
      </button>

      <div v-else>
        <button
          v-if="!unlockedStepStore.offenseAndDefenseUnlocked"
          class="unlock-button"
          @click="unlockedStepStore.unlockOffenseAndDefense()"
          :disabled="antStore.leaves < 50000"
        >
          Unlock Offense and Defense (50000 leaves)
        </button>
      </div>


      <img :src="queenImage" alt="Queen Ant" class="queen-image" />
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/clicker.css';

.game-container {
  width: 500px;
}

.banner {
  background-color: #008000;
}

.unlock-button {
  margin-top: 15px;
}

.queen-image {
  position: absolute;
  top: 75px;
  right: 25px;
  width: 100px;
  height: auto;
  z-index: 1;
  pointer-events: none;
}
</style>
