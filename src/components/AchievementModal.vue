<script setup lang="ts">
import { useAchievementsStore } from '@/stores/achievementsStore.ts'
import { computed } from 'vue'

const achievementsStore = useAchievementsStore()
const groupedAchievements = computed(() => {
  return achievementsStore.achievements.reduce((groups, achievement) => {
    const theme = achievement.theme;
    if (!groups[theme]) {
      groups[theme] = [];
    }
    groups[theme].push(achievement);
    return groups;
  }, {} as Record<string, typeof achievementsStore.achievements>);
});
</script>

<template>
  <div class="modal">
    <h2 class="modal-title">Achievements</h2>
    <div class="achievement-grid">
      <!-- Parcours des groupes d'achievements par thème -->
      <div v-for="(group, theme) in groupedAchievements" :key="theme">
        <h3 class="achievement-theme-title">{{ theme }}</h3>
        <div
          v-for="achievement in group"
          :key="achievement.name"
          class="achievement-card"
          :class="{ unlocked: achievement.unlocked }"
        >
          <div class="achievement-info">
            <p class="achievement-tier">{{ achievement.tier }}</p>
            <p class="achievement-name">{{ achievement.name }}</p>
          </div>
          <div class="achievement-hover">
            <p class="achievement-description">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.modal {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  max-width: 350px;
}

.modal-title {
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: #273747;
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  gap: 10px;
}

.achievement-card {
  background: rgba(255, 255, 255, 0.5);
  padding: 8px;
  margin-top: 2px;
  border-radius: 4px;
  transition: transform 0.2s ease, background-color 0.3s ease;
  text-align: center;
  position: relative;
}

.achievement-card.unlocked {
  background: #f3b554;
}

.achievement-info {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.achievement-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);
  color: #273747;
  transition: opacity 0.3s ease;
  border-radius: 4px;
}

.achievement-card:hover .achievement-info {
  opacity: 0;
}

.achievement-card:hover .achievement-hover {
  opacity: 1;
}

.achievement-tier {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #273747;
  font-family: 'Press Start 2P', cursive;
}

.achievement-name {
  font-size: 12px;
  font-weight: normal;
  margin-top: 10px;
  color: #273747;
}

.achievement-theme-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  color: #273747;
  border-bottom: 2px solid #273747;
  padding-bottom: 10px;
}

.achievement-description {
  font-size: 14px;
  text-align: center;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

</style>
