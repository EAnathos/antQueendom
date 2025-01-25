// stores/laboratoryStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'

export const useLaboratoryStore = defineStore('laboratory', () => {
  const mushrooms = ref(0);
  const mushroomRate = ref(1);
  const mushroomEffect = ref(1);

  const unlockedStepsStore = useUnlockedStepStore();

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedMushrooms = localStorage.getItem('mushrooms');
    const savedMushroomRate = localStorage.getItem('mushroomRate');
    const savedMushroomEffect = localStorage.getItem('mushroomEffect');

    if (savedMushrooms) mushrooms.value = parseInt(savedMushrooms, 10)
    if (savedMushroomRate) mushroomRate.value = parseInt(savedMushroomRate, 10)
    if (savedMushroomEffect) mushroomEffect.value = parseInt(savedMushroomEffect, 10)
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('mushrooms', mushrooms.value.toString());
    localStorage.setItem('mushroomRate', mushroomRate.value.toString());
    localStorage.setItem('mushroomEffect', mushroomEffect.value.toString());
  };

  // Increase mushroom rate
  const increaseMushrooms = () => {
    saveToLocalStorage();
    mushrooms.value += mushroomRate.value;
  };

  let interval: number | null = null;

  const startMushroomProduction = () => {
    if (!interval) {
      interval = setInterval(() => {
        mushrooms.value += mushroomRate.value;
        saveToLocalStorage();
      }, 1000);
    }
  };

  const stopMushroomProduction = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  // Start mushroom production at an interval
  if (unlockedStepsStore.labUnlocked) setInterval(increaseMushrooms, 1000);

  return {
    mushrooms,
    mushroomRate,
    mushroomEffect,
    loadFromLocalStorage,
    saveToLocalStorage,
    startMushroomProduction,
    stopMushroomProduction,
  };
});
