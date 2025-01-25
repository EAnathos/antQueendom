<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import queenImage from '@/assets/queen.png';
import { useMushroomsStore } from '@/stores/mushroomsStore.ts';

const leaves = ref(0);
const workers = ref(0);
const workerCost = ref(10);

const mushroomsStore = useMushroomsStore();
const labUnlocked = ref(false);

const leavesPerSecond = computed(() => {
  return Math.ceil(workers.value * (1 + (mushroomsStore.mushrooms / 100) || 1));
});

const loadFromLocalStorage = () => {
  const savedLeaves = localStorage.getItem('leaves');

  const savedWorkers = localStorage.getItem('workers');
  const savedWorkerCost = localStorage.getItem('workerCost');

  const savedLabUnlocked = localStorage.getItem('labUnlocked');

  if (savedLeaves) leaves.value = parseInt(savedLeaves, 10);

  if (savedWorkers) workers.value = parseInt(savedWorkers, 10);
  if (savedWorkerCost) workerCost.value = parseInt(savedWorkerCost, 10);

  if (savedLabUnlocked) labUnlocked.value = savedLabUnlocked === 'true';
};

const saveToLocalStorage = () => {
  localStorage.setItem('leaves', leaves.value.toString());
  localStorage.setItem('workers', workers.value.toString());
  localStorage.setItem('workerCost', workerCost.value.toString());
  localStorage.setItem('labUnlocked', labUnlocked.value.toString());
};

const handleClick = () => {
  leaves.value++;
};

const recruitWorker = () => {
  if (leaves.value >= workerCost.value) {
    workers.value++;
    leaves.value -= workerCost.value;
    workerCost.value = Math.ceil(workerCost.value * 1.2);
    saveToLocalStorage();
  }
};

const unlockLab = () => {
  if (leaves.value >= 1000) {
    labUnlocked.value = true;
    leaves.value -= 1000;

    saveToLocalStorage();

    window.location.reload();
  }
};

onMounted(() => {
  loadFromLocalStorage();
  mushroomsStore.loadFromLocalStorage();

  setInterval(() => {
    leaves.value += leavesPerSecond.value;
    saveToLocalStorage();
    mushroomsStore.saveToLocalStorage();
  }, 1000);
});

// Surveiller les états et sauvegarder dans le localStorage
watch([leaves, workers, workerCost, labUnlocked], saveToLocalStorage);
</script>

<template>
  <div class="game-container">
    <div class="banner">
      <p>Ant Queendom</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">You have {{ leaves }} leaves</p>
      <p class="rate-display">(+{{ leavesPerSecond }} leaves/s)</p>
      <button @click="handleClick">Collect leaves</button>
      <button @click="recruitWorker" :disabled="leaves < workerCost">
        Recruit Worker ({{ workerCost }} leaves)
        <span>Current : {{ workers }} workers</span>
      </button>
      <button class="lab-button" @click="unlockLab" :disabled="leaves < 1000 || labUnlocked">
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
