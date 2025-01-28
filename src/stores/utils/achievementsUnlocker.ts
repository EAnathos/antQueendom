import { useAchievementsStore } from '@/stores/achievementsStore.ts'

export const checkWorkersAchievements = (workers: number) => {
  const achievementsStore = useAchievementsStore()
  const thresholds = achievementsStore.thresholds

  for (let i = 0; i < thresholds.workers.length; i++) {
    if (workers >= thresholds.workers[i]) {
      const achievement = getWorkerAchievement(i)
      achievementsStore.unlockAchievement(achievement)
    }
  }
}

const getWorkerAchievement = (index: number) => {
  switch (index) {
    case 0:
      return 'First steps'
    case 1:
      return 'Growing team'
    case 2:
      return 'Ants are coming'
    case 3:
      return 'Ants are here'
    case 4:
      return 'Ants are legion'
    default:
      return ''
  }
}

export const checkMushroomsAchievements = (mushrooms: number) => {
  const achievementsStore = useAchievementsStore()

  for (let i = 0; i < thresholds.mushrooms.length; i++) {
    if (mushrooms >= thresholds.mushrooms[i]) {
      const achievement = getMushroomAchievement(i)
      achievementsStore.unlockAchievement(achievement)
    }
  }
}

const getMushroomAchievement = (index: number) => {
  switch (index) {
    case 0:
      return 'First mushroom'
    case 1:
      return 'Mushroom gatherer'
    case 2:
      return 'Mushroom farmer'
    case 3:
      return 'Mushroom master'
    case 4:
      return 'Mycologist'
    default:
      return ''
  }
}
