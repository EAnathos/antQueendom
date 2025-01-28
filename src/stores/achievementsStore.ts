// stores/achievementsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAchievementsStore = defineStore('achievements', () => {
  const thresholds = ref({
    workers: [1, 100, 10000, 1000000, 100000000],
    mushrooms: [1, 10000, 1000000000, 1000000000000, 1000000000000000],
  })

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
      description: 'Recruit' + thresholds.value.workers[1] + 'workers',
      unlocked: false,
      theme: 'Workers',
      tier: 'II',
    },
    {
      name: 'Ants are coming',
      description: 'Recruit' + thresholds.value.workers[2] + 'workers',
      unlocked: false,
      theme: 'Workers',
      tier: 'III',
    },
    {
      name: 'Ants are here',
      description: 'Recruit' + thresholds.value.workers[3] + 'workers',
      unlocked: false,
      theme: 'Workers',
      tier: 'IV',
    },
    {
      name: 'Ants are legion',
      description: 'Recruit' + thresholds.value.workers[4] + 'workers',
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
      description: 'Collect' + thresholds.value.mushrooms[1] + 'mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'II',
    },
    {
      name: 'Mushroom farmer',
      description: 'Collect' + thresholds.value.mushrooms[2] + 'mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'III',
    },
    {
      name: 'Mushroom master',
      description: 'Collect' + thresholds.value.mushrooms[3] + 'mushrooms',
      unlocked: false,
      theme: 'Mushrooms',
      tier: 'IV',
    },
    {
      name: 'Mycologist',
      description: 'Collect' + thresholds.value.mushrooms[4] + 'mushrooms',
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
