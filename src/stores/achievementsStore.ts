// stores/achievementsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAchievementsStore = defineStore('achievements', () => {
  const thresholds = ref({
    leaves: [1, 10000, 1000000000, 1000000000000, 1000000000000000],
    mushrooms: [1, 10000, 1000000000, 1000000000000, 1000000000000000],
  })

  const achievements = ref([
    // Leaf-themed achievements
    {
      name: 'First steps',
      description: 'Collect your first leaf',
      unlocked: false,
      theme: 'Leaves',
      tier: 'I',
    },
    {
      name: 'Eco-friendly',
      description: 'Collect ' + thresholds.value.leaves[1] + ' leaves',
      unlocked: false,
      theme: 'Leaves',
      tier: 'II',
    },
    {
      name: 'Tree hugger',
      description: 'Collect ' + thresholds.value.leaves[2].toExponential() + ' leaves',
      unlocked: false,
      theme: 'Leaves',
      tier: 'III',
    },
    {
      name: 'Forest guardian',
      description: 'Collect ' + thresholds.value.leaves[3].toExponential() + ' leaves',
      unlocked: false,
      theme: 'Leaves',
      tier: 'IV',
    },
    {
      name: 'Mother Nature',
      description: 'Collect ' + thresholds.value.leaves[4].toExponential() + ' leaves',
      unlocked: false,
      theme: 'Leaves',
      tier: 'V',
    },
    // Mushroom-themed achievements
    {
      name: 'First mushroom',
      description: 'Collect your first mushroom',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'I',
    },
    {
      name: 'Mushroom gatherer',
      description: 'Collect ' + thresholds.value.mushrooms[1] + ' mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'II',
    },
    {
      name: 'Mushroom farmer',
      description: 'Collect ' + thresholds.value.mushrooms[2].toExponential() + ' mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'III',
    },
    {
      name: 'Mushroom master',
      description: 'Collect ' + thresholds.value.mushrooms[3].toExponential() + ' mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'IV',
    },
    {
      name: 'Mycologist',
      description: 'Collect ' + thresholds.value.mushrooms[4].toExponential() + ' mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'V',
    },
  ])

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedAchievements = localStorage.getItem('achievements')

    if (savedAchievements) {
      achievements.value = JSON.parse(savedAchievements)
    }
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('achievements', JSON.stringify(achievements.value))
  }

  // Unlock an achievement by its name
  const unlockAchievement = (achievementName: string) => {
    const achievement = achievements.value.find((ach) => ach.name === achievementName)
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true
      saveToLocalStorage()
    }
  }

  return {
    achievements,
    thresholds,
    loadFromLocalStorage,
    saveToLocalStorage,
    unlockAchievement,
  }
})
