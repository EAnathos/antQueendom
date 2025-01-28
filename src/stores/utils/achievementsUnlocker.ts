import { useAchievementsStore } from '@/stores/achievementsStore.ts'

const workersThresholds = [1, 100, 10000, 1000000, 100000000]
const mushroomsThresholds = [1, 100, 1000, 10000, 100000]

export const checkWorkersAchievements = (workers: number) => {
  const achievementsStore = useAchievementsStore()

  switch (workers) {
    case workersThresholds[0]:
      achievementsStore.unlockAchievement('First steps')
      break
    case workersThresholds[1]:
      achievementsStore.unlockAchievement('Growing team')
      break
    case workersThresholds[2]:
      achievementsStore.unlockAchievement('Ants are coming')
      break
    case workersThresholds[3]:
      achievementsStore.unlockAchievement('Ants are here')
      break
    case workersThresholds[4]:
      achievementsStore.unlockAchievement('Ants are legion')
      break
  }
}

export const checkMushroomsAchievements = (mushrooms: number) => {
  const achievementsStore = useAchievementsStore()

  switch (mushrooms) {
    case mushroomsThresholds[0]:
      achievementsStore.unlockAchievement('First mushroom')
      break
    case mushroomsThresholds[1]:
      achievementsStore.unlockAchievement('Mushroom gatherer')
      break
    case mushroomsThresholds[2]:
      achievementsStore.unlockAchievement('Mushroom farmer')
      break
    case mushroomsThresholds[3]:
      achievementsStore.unlockAchievement('Mushroom master')
      break
    case mushroomsThresholds[4]:
      achievementsStore.unlockAchievement('Mycologist')
      break
  }
}
