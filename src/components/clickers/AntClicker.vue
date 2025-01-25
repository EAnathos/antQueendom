<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import queenImage from '@/assets/queen.png';
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts';
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useAntStore } from '@/stores/antStore.ts'

const workerCost = ref(10);

const laboratoryStore = useLaboratoryStore();
const antStore = useAntStore();
const unlockedStepStore = useUnlockedStepStore();

const loadFromLocalStorage = () => {
  const savedWorkerCost = localStorage.getItem('workerCost');

  if (savedWorkerCost) workerCost.value = parseInt(savedWorkerCost, 10);
};

const saveToLocalStorage = () => {
  localStorage.setItem('workerCost', workerCost.value.toString());
};

const handleClick = () => {
  antStore.leaves++;
};

const recruitWorker = () => {
  if (antStore.leaves >= workerCost.value) {
    antStore.workers++;
    antStore.leaves -= workerCost.value;
    workerCost.value = Math.ceil(workerCost.value * 1.2);
    saveToLocalStorage();
  }
};

onMounted(() => {
  loadFromLocalStorage();
  antStore.loadFromLocalStorage();
  laboratoryStore.loadFromLocalStorage();
  unlockedStepStore.loadFromLocalStorage();
});

watch(workerCost, saveToLocalStorage);
</script>

<template>
  <div class="game-container">
    <div class="banner">
      <p>Ant Queendom</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">
        You have {{ antStore.leaves > 1000 ? Math.round(antStore.leaves) : antStore.leaves.toFixed(2) }} leaves
      </p>
      <p class="rate-display">
        (+{{ antStore.leavesPerSecond > 100 ? Math.round(antStore.leavesPerSecond) : antStore.leavesPerSecond.toFixed(2) }} leaves/s)
      </p>
      <button @click="handleClick">Collect leaves</button>
      <button @click="recruitWorker" :disabled="antStore.leaves < workerCost">
        Recruit Worker ({{ workerCost }} leaves)
        <span>Current : {{ antStore.workers }} workers</span>
      </button>
      <button class="lab-button" @click="unlockedStepStore.unlockLab()" :disabled="antStore.leaves < 1000 || unlockedStepStore.labUnlocked">
        Unlock Lab (1000 leaves)
      </button>

      <img
        :src="queenImage"
        alt="Queen Ant"
        class="queen-image"
      />
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/clickers.css';

.game-container {
  width: 400px;
}

.banner {
  background-color: #008000;
}

.lab-button {
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
