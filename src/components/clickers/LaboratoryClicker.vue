<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts';
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'

const laboratoryStore = useLaboratoryStore();
const unlockedStepStore = useUnlockedStepStore();

const mushroomRateUpgradeCost = ref(20);
const mushroomEffectUpgradeCost = ref(100);

const loadFromLocalStorage = () => {
  const savedMushroomRateUpgradeCost = localStorage.getItem('mushroomRateUpgradeCost');
  const savedMushroomEffectUpgradeCost = localStorage.getItem('mushroomEffectUpgradeCost');

  if (savedMushroomRateUpgradeCost) mushroomRateUpgradeCost.value = parseInt(savedMushroomRateUpgradeCost, 10);
  if (savedMushroomEffectUpgradeCost) mushroomEffectUpgradeCost.value = parseInt(savedMushroomEffectUpgradeCost, 10);
};

const saveToLocalStorage = () => {
  localStorage.setItem('mushroomRateUpgradeCost', mushroomRateUpgradeCost.value.toString());
  localStorage.setItem('mushroomEffectUpgradeCost', mushroomEffectUpgradeCost.value.toString());
};

const increaseMushroomRate = () => {
  if (laboratoryStore.mushrooms >= mushroomRateUpgradeCost.value) {
    laboratoryStore.mushroomRate++;
    laboratoryStore.mushrooms -= mushroomRateUpgradeCost.value;
    mushroomRateUpgradeCost.value = Math.ceil(mushroomRateUpgradeCost.value * 1.2);

    saveToLocalStorage();
  }
};

const increaseMushroomEffect = () => {
  if (laboratoryStore.mushrooms >= mushroomEffectUpgradeCost.value) {
    laboratoryStore.mushroomEffect++;
    laboratoryStore.mushrooms -= mushroomEffectUpgradeCost.value;
    mushroomEffectUpgradeCost.value = Math.ceil(mushroomEffectUpgradeCost.value * 1.2);

    saveToLocalStorage();
  }
};

onMounted(() => {
  loadFromLocalStorage();
  laboratoryStore.loadFromLocalStorage();

  if (unlockedStepStore.labUnlocked) {
    laboratoryStore.startMushroomProduction();
  }
});

watch(
  () => unlockedStepStore.labUnlocked,
  (newVal) => {
    if (newVal) {
      laboratoryStore.startMushroomProduction();
    } else {
      laboratoryStore.stopMushroomProduction();
    }
  }
);

watch([mushroomRateUpgradeCost, mushroomEffectUpgradeCost], saveToLocalStorage);
</script>

<template>
  <div v-if="unlockedStepStore.labUnlocked" class="game-container">
    <div class="banner">
      <p>Laboratory</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">You have {{ laboratoryStore.mushrooms }} mushrooms</p>
      <p class="rate-display">(+{{ laboratoryStore.mushroomRate }} mushrooms/s)</p>

      <button @click="increaseMushroomRate" :disabled="laboratoryStore.mushrooms < mushroomRateUpgradeCost">
        <span>Increase Mushroom Rate</span>
        <span>Current : {{ laboratoryStore.mushroomRate }} mushrooms/s</span>
        <span>Cost : {{ mushroomRateUpgradeCost }} mushrooms</span>
      </button>

      <button @click="increaseMushroomEffect" :disabled="laboratoryStore.mushrooms < mushroomEffectUpgradeCost">
        <span>Increase Mushroom Effect</span>
        <span>Current : x{{ laboratoryStore.mushroomEffect }} leaves/s</span>
        <span>Cost : {{ mushroomEffectUpgradeCost }} mushrooms</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/clickers.css';

.game-container {
  width: 300px;
}

.banner {
  background-color: #1e475c;
}
</style>
