<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useWarStore } from '@/stores/warStore.ts'
import { useAntStore } from '@/stores/antStore.ts'

const unlockedStepStore = useUnlockedStepStore()
const warStore = useWarStore()
const antStore = useAntStore()

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

const isAttacked = ref(false)
const attack = () => {
  if (canAttack.value) {
    antStore.workers -= selectedAttack.value.workersCost
    warStore.foods += selectedAttack.value.foodGain
    warStore.probDefense += selectedAttack.value.tier
  }

  if (Math.random() * 100 < warStore.probDefense) {
    warStore.probDefense = 0
    antStore.workers -= Math.floor(antStore.workers * 0.1)
    isAttacked.value = true
    setTimeout(() => {
      isAttacked.value = false
    }, 1000)
  }
}

const attackProbability = computed(() => Math.min(warStore.probDefense, 100))
const workersLostOnAttack = computed(() => Math.floor(antStore.workers * 0.1))

const reinforceDefense = () => {
  if (warStore.foods >= 50 && warStore.probDefense > 0) {
    warStore.foods -= 50
    warStore.probDefense = Math.max(warStore.probDefense - 5, 0)
  }
}
</script>

<template>
  <div v-if="unlockedStepStore.offenseAndDefenseUnlocked" class="game-container" :class="{ attacked: isAttacked }">
    <div class="banner">
      <p>Offense</p>
    </div>
    <div class="game-panel">
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

    <hr class="separator" />

    <div class="banner">
      <p>Defense</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">Attack probability : {{ attackProbability }}%</p>
      <p class="resource-display">Workers lost on attack : {{ workersLostOnAttack }}</p>
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
  transition: transform 0.2s ease;
}

.game-container.attacked {
  animation: shake 0.5s ease-out, flash 0.5s ease-out;
}

@keyframes shake {
  0% { transform: translate(200px, -405px); }
  25% { transform: translate(205px, -400px); }
  50% { transform: translate(200px, -405px); }
  75% { transform: translate(195px, -400px); }
  100% { transform: translate(200px, -405px); }
}

@keyframes flash {
  0% { background-color: transparent; }
  50% { background-color: rgba(255, 0, 0, 0.5); }
  100% { background-color: transparent; }
}

.banner {
  background-color: #800000;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  color: white;
}

.separator {
  margin: 20px 0;
  border: none;
  border-top: 2px solid #800000;
}

.attack-controls, .defense-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  background-color: #d3d3d3;
  margin-left: auto;
}
</style>
