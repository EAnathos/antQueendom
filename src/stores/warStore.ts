// stores/warStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWarStore = defineStore('war', () => {
  const foods = ref(0)
  const probDefense = ref(0)

  const loadFromLocalStorage = () => {
    const savedFoods = localStorage.getItem('foods')
    const savedProbDefense = localStorage.getItem('probDefense')

    if (savedFoods) foods.value = parseInt(savedFoods)
    if (savedProbDefense) probDefense.value = parseInt(savedProbDefense)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('foods', foods.value.toString())
    localStorage.setItem('probDefense', probDefense.value.toString())
  }

  return {
    foods,
    probDefense,
    loadFromLocalStorage,
    saveToLocalStorage,
  }
})
