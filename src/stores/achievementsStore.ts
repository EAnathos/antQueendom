// stores/achievementsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAchievementsStore = defineStore('achievements', () => {
  const achievements = ref([
    {
      name: 'First steps',
      description: 'Recruit your first worker',
      unlocked: false,
      theme: 'Workers',
      tier: 'I',
    },
    {
      name: 'Growing team',
      description: 'Recruit 100 workers',
      unlocked: false,
      theme: 'Workers',
      tier: 'II',
    },
    {
      name: 'Ants are coming',
      description: 'Recruit 10000 workers',
      unlocked: false,
      theme: 'Workers',
      tier: 'III',
    },
    {
      name: 'Ants are here',
      description: 'Recruit 1000000 workers',
      unlocked: false,
      theme: 'Workers',
      tier: 'IV',
    },
    {
      name: 'Ants are legion',
      description: 'Recruit 100000000 workers',
      unlocked: false,
      theme: 'Workers',
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
      description: 'Collect 100 mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'II',
    },
    {
      name: 'Mushroom farmer',
      description: 'Collect 1000 mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'III',
    },
    {
      name: 'Mushroom master',
      description: 'Collect 10000 mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'IV',
    },
    {
      name: 'Mycologist',
      description: 'Collect 100000 mushrooms',
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
    const achievement = achievements.value.find(ach => ach.name === achievementName)
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true
      saveToLocalStorage()
    }
  }

  return {
    achievements,
    loadFromLocalStorage,
    saveToLocalStorage,
    unlockAchievement,
  }
})
