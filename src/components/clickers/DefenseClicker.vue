<script setup lang="ts">
import { computed } from 'vue'
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useWarStore } from '@/stores/warStore.ts'
import { useAntStore } from '@/stores/antStore.ts'

const unlockedStepStore = useUnlockedStepStore()
const warStore = useWarStore()
const antStore = useAntStore()

const attackProbability = computed(() => Math.min(warStore.probDefense, 100))

const workersLostOnAttack = computed(() => Math.floor(antStore.workers * 0.1))

// Fonction pour réduire la probabilité d'attaque en dépensant des ressources
const reinforceDefense = () => {
  if (warStore.foods >= 50 && warStore.probDefense > 0) {
    warStore.foods -= 50
    warStore.probDefense = Math.max(warStore.probDefense - 5, 0)
  }
}
</script>

<template>
  <div v-if="unlockedStepStore.offenseAndDefenseUnlocked" class="game-container">
    <div class="banner">
      <p>Defense</p>
    </div>

    <div class="game-panel">
      <p class="resource-display">
        Attack probability : {{ attackProbability }}%
      </p>

      <p class="resource-display">
        Workers lost on attack : {{ workersLostOnAttack }}
      </p>

      <div class="defense-controls">
        <button @click="reinforceDefense" :disabled="warStore.foods < 50 || warStore.probDefense === 0">
          <span> Reinforce defense </span>
          <span> (50 foods) (-5% attack probability) </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/clicker.css';

.game-container {
  width: 400px;
}

.banner {
  background-color: #800000;
}

.defense-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  align-items: center;
}
</style>
