// stores/antStore.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { useLaboratoryStore } from '@/stores/laboratoryStore.ts'

export const useAntStore = defineStore('ant', () => {
  const leaves = ref(1000);
  const workers = ref(0);

  const laboratoryStore = useLaboratoryStore();

  const leavesPerSecond = computed(() => {
    const mushroomEffect = laboratoryStore.mushrooms > 0
      ? (1 + laboratoryStore.mushrooms / 100) * laboratoryStore.mushroomEffect
      : 1; // Par défaut, l'effet est 1 si aucun champignon n'est présent.
    return workers.value * mushroomEffect;
  });


  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedLeaves = localStorage.getItem('leaves');
    const savedWorkers = localStorage.getItem('workers');

    if (savedLeaves) leaves.value = parseInt(savedLeaves, 10);
    if (savedWorkers) workers.value = parseInt(savedWorkers, 10);
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('leaves', leaves.value.toString());
    localStorage.setItem('workers', workers.value.toString());
  };

  // Increase leaves
  const increaseLeaves = () => {
    leaves.value += leavesPerSecond.value;
    saveToLocalStorage();
  };

  // Start mushroom production at an interval
  setInterval(increaseLeaves, 1000);

  return { leaves, workers, leavesPerSecond, loadFromLocalStorage, saveToLocalStorage };
});
