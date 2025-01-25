// stores/mushroomsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMushroomsStore = defineStore('mushrooms', () => {
  const mushrooms = ref(0);
  const mushroomRate = ref(1);

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedMushrooms = localStorage.getItem('mushrooms');
    if (savedMushrooms) mushrooms.value = parseInt(savedMushrooms, 10);
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('mushrooms', mushrooms.value.toString());
  };

  // Increase mushroom rate
  const increaseMushroomRate = () => {
    mushrooms.value += mushroomRate.value;
    saveToLocalStorage();
  };

  // Start mushroom production at an interval
  setInterval(increaseMushroomRate, 1000);

  return { mushrooms, mushroomRate, loadFromLocalStorage, saveToLocalStorage };
});
