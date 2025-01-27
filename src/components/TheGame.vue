<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AntClicker from './clickers/AntClicker.vue'
import LaboratoryClicker from '@/components/clickers/LaboratoryClicker.vue'
import OffenseClicker from '@/components/clickers/OffenseClicker.vue'
import DefenseClicker from '@/components/clickers/DefenseClicker.vue'
import { useAchievementsStore } from '@/stores/achievementsStore.ts'

const backgroundOffset = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const achievementsStore = useAchievementsStore()
const isAchievementsOpen = ref(false)

const toggleAchievements = () => {
  isAchievementsOpen.value = !isAchievementsOpen.value
}

const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  dragStart.value = {
    x: event.clientX - backgroundOffset.value.x,
    y: event.clientY - backgroundOffset.value.y,
  }
}

const drag = (event: MouseEvent) => {
  if (isDragging.value) {
    backgroundOffset.value.x = event.clientX - dragStart.value.x
    backgroundOffset.value.y = event.clientY - dragStart.value.y
  }
}

const stopDrag = () => {
  isDragging.value = false
}

const resetAccount = () => {
  if (confirm('Are you sure you want to reset your account? This action cannot be undone.')) {
    localStorage.clear()

    window.location.reload()
  }
}

onMounted(() => {
  backgroundOffset.value = {
    x: -10240,
    y: -10240,
  }

  window.addEventListener('mousemove', drag)
  window.addEventListener('mouseup', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', drag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <button @click="toggleAchievements">Achievements</button>
      <button @click="resetAccount">Reset</button>
    </nav>

    <!-- Achievements Modal -->
    <div v-if="isAchievementsOpen" class="modal-overlay" @click.self="toggleAchievements">
      <div class="modal">
        <h2 class="modal-title">Achievements</h2>
        <div class="achievement-grid">
          <div
            v-for="achievement in achievementsStore.achievements"
            :key="achievement.name"
            class="achievement-card"
            :class="{ unlocked: achievement.unlocked }"
          >
            <!-- Contenu par défaut -->
            <div class="achievement-info">
              <p class="achievement-tier">{{ achievement.tier }}</p>
              <p class="achievement-theme">{{ achievement.theme }}</p>
            </div>
            <!-- Contenu au survol -->
            <div class="achievement-hover">
              <h3 class="achievement-title">{{ achievement.name }}</h3>
              <p class="achievement-description">{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background with draggable functionality -->
    <div
      class="background"
      @mousedown="startDrag"
      :style="{ transform: `translate(${backgroundOffset.x}px, ${backgroundOffset.y}px)` }"
    >
      <div class="background-layer grass"></div>
      <div class="background-layer stones"></div>

      <!-- Ant Clicker component -->
      <AntClicker
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(375px, -100px)',
          zIndex: 3,
        }"
      />

      <!-- Laboratory Clicker -->
      <LaboratoryClicker
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50px, 50px)',
          zIndex: 3,
        }"
      />

      <OffenseClicker
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(200px, -250px)',
          zIndex: 3,
        }"
      />

      <DefenseClicker
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(700px, -250px)',
          zIndex: 3,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
/* Navbar Styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background-color: #222;
  color: white;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.navbar button {
  font-family: inherit;
  font-size: 14px;
  padding: 3px 12px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navbar button:hover {
  background-color: #777;
  transform: scale(1.05);
}

/* Background Styles */
.background {
  width: 20480px;
  height: 20480px;
  position: absolute;
  background-color: #3a4d23;
  cursor: grab;
  transform-origin: center;
  overflow: hidden;
  z-index: 1;
}

.background:active {
  cursor: grabbing;
}

.background-layer.grass {
  background-color: #3d5a2e;
  background-image: radial-gradient(circle, #2e4521 2px, transparent 2px);
  background-size: 16px 16px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  opacity: 0.85;
}

.background-layer.stones {
  background-color: #5e4327;
  background-image: radial-gradient(circle, #3d2b1f 2px, transparent 2px);
  background-size: 32px 32px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  opacity: 0.7;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background: #ecf0f1;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  width: 40%;
  max-width: 400px;
}

.modal-title {
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: #34495e;
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.achievement-card {
  background: #ffffff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.achievement-card:hover {
  transform: translateY(-5px);
}

.achievement-card.unlocked {
  background: #f39c12;
  color: #fff;
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
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  transition: opacity 0.3s ease;
  border-radius: 6px;
}

.achievement-card:hover .achievement-info {
  opacity: 0;
}

.achievement-card:hover .achievement-hover {
  opacity: 1;
}

.achievement-tier,
.achievement-theme {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #34495e;
}

.achievement-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
}

.achievement-description {
  font-size: 14px;
  text-align: center;
  padding: 0 10px;
}
</style>
