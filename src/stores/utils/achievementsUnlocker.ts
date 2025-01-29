import { useAchievementsStore } from '@/stores/achievementsStore.ts'

export const checkLeavesAchievements = (leaves: number) => {
  const achievementsStore = useAchievementsStore()

  for (let i = 0; i < achievementsStore.thresholds.leaves.length; i++) {
    if (leaves >= achievementsStore.thresholds.leaves[i]) {
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

  for (let i = 0; i < achievementsStore.thresholds.mushrooms.length; i++) {
    if (mushrooms >= achievementsStore.thresholds.mushrooms[i]) {
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
