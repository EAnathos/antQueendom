<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useWarStore } from '@/stores/warStore.ts'
import { useAntStore } from '@/stores/antStore.ts'

const unlockedStepStore = useUnlockedStepStore()
const antStore = useAntStore()
const warStore = useWarStore()

const selectedTier = ref(1)

const attackTiers = [
  { tier: 1, workersCost: 10, foodGain: 5 },
  { tier: 2, workersCost: 50, foodGain: 30 },
  { tier: 3, workersCost: 250, foodGain: 200 },
  { tier: 4, workersCost: 1000, foodGain: 1000 },
  { tier: 5, workersCost: 5000, foodGain: 10000 }
]

const canAttack = computed(() => {
  const attack = attackTiers.find(a => a.tier === selectedTier.value)
  return attack ? antStore.workers >= attack.workersCost : false
})

const selectedAttack = computed(() => {
  return attackTiers.find(a => a.tier === selectedTier.value) || { foodGain: 0, workersCost: 0, tier: 0 }
})

const attack = () => {
  if (canAttack.value) {
    antStore.workers -= selectedAttack.value.workersCost
    warStore.foods += selectedAttack.value.foodGain
    warStore.probDefense += selectedAttack.value.tier
  }
}
</script>

<template>
  <div v-if="unlockedStepStore.offenseAndDefenseUnlocked" class="game-container">
    <div class="banner">
      <p>Offense</p>
    </div>

    <div class="game-panel">
      <p class="resource-display">
        You have
        {{
          warStore.foods > 1000000
            ? warStore.foods.toExponential(2)
            : warStore.foods > 1000
              ? Math.round(warStore.foods)
              : warStore.foods
        }}
        foods
      </p>

      <div class="attack-controls">
        <button @click="attack" :disabled="!canAttack">
          <span> Attack </span>
          <span> (+{{ selectedAttack.foodGain }} foods, -{{ selectedAttack.workersCost }} workers) </span>
        </button>

        <select id="attack-tier" v-model="selectedTier">
          <option v-for="tier in attackTiers" :key="tier.tier" :value="tier.tier">
            Tier {{ tier.tier }}
          </option>
        </select>
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
  background-color: #800013;
}

.attack-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  align-items: center;
}

select {
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
