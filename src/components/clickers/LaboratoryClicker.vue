<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useMushroomsStore } from '@/stores/mushroomsStore.ts';

const mushroomsStore = useMushroomsStore();
const mushroomRate = ref(1);
const mushroomRateUpgradeCost = ref(50);

const mushroomEffect = ref(2);
const mushroomEffectUpgradeCost = ref(100);

const labUnlocked = ref(false);

const loadFromLocalStorage = () => {
  const savedMushroomRate = localStorage.getItem('mushroomRate');
  const savedMushroomRateUpgradeCost = localStorage.getItem('mushroomRateUpgradeCost');

  const savedMushroomEffect = localStorage.getItem('mushroomEffect');
  const savedMushroomEffectUpgradeCost = localStorage.getItem('mushroomEffectUpgradeCost');

  const savedLabUnlocked = localStorage.getItem('labUnlocked');

  if (savedMushroomRate) mushroomRate.value = parseInt(savedMushroomRate, 10);
  if (savedMushroomRateUpgradeCost) mushroomRateUpgradeCost.value = parseInt(savedMushroomRateUpgradeCost, 10);

  if (savedMushroomEffect) mushroomEffect.value = parseInt(savedMushroomEffect, 10);
  if (savedMushroomEffectUpgradeCost) mushroomEffectUpgradeCost.value = parseInt(savedMushroomEffectUpgradeCost, 10);

  if (savedLabUnlocked) labUnlocked.value = savedLabUnlocked === 'true';
};

const saveToLocalStorage = () => {
  localStorage.setItem('mushroomRate', mushroomRate.value.toString());
  localStorage.setItem('mushroomRateUpgradeCost', mushroomRateUpgradeCost.value.toString());

  localStorage.setItem('mushroomEffect', mushroomEffect.value.toString());
  localStorage.setItem('mushroomEffectUpgradeCost', mushroomEffectUpgradeCost.value.toString());
};

const increaseMushroomRate = () => {
  if (mushroomsStore.mushrooms >= mushroomRateUpgradeCost.value) {
    mushroomRate.value++;
    mushroomsStore.mushrooms -= mushroomRateUpgradeCost.value;
    mushroomRateUpgradeCost.value = Math.ceil(mushroomRateUpgradeCost.value * 1.2);

    saveToLocalStorage();
  }
};

const increaseMushroomEffect = () => {
  if (mushroomsStore.mushrooms >= mushroomEffectUpgradeCost.value) {
    mushroomEffect.value++;
    mushroomsStore.mushrooms -= mushroomEffectUpgradeCost.value;
    mushroomEffectUpgradeCost.value = Math.ceil(mushroomEffectUpgradeCost.value * 1.2);

    saveToLocalStorage();
  }
};

onMounted(() => {
  loadFromLocalStorage();

  setInterval(() => {
    mushroomsStore.mushrooms += mushroomRate.value;

    mushroomsStore.saveToLocalStorage();
  }, 1000);
});

watch([mushroomRate, mushroomRateUpgradeCost, mushroomEffect, mushroomEffectUpgradeCost], saveToLocalStorage);
</script>

<template>
  <div v-if="labUnlocked" class="game-container">
    <div class="banner">
      <p>Laboratory</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">You have {{ mushroomsStore.mushrooms }} mushrooms</p>
      <p class="rate-display">(+{{ mushroomRate }} mushrooms/s)</p>

      <button @click="increaseMushroomRate" :disabled="mushroomsStore.mushrooms < mushroomRateUpgradeCost">
        <span>Increase Mushroom Rate</span>
        <span>Current : {{ mushroomRate }} mushrooms/s</span>
        <span>Cost : {{ mushroomRateUpgradeCost }} mushrooms</span>
      </button>

      <button @click="increaseMushroomEffect" :disabled="mushroomsStore.mushrooms < mushroomEffectUpgradeCost">
        <span>Increase Mushroom Effect</span>
        <span>Current : x{{ mushroomEffect }} leaves/s</span>
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
