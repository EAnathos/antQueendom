<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AntClicker from './AntClicker.vue'

const backgroundOffset = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

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
    window.location.reload() // Recharge la page pour réinitialiser les valeurs
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
      <button>Achievements</button>
      <button @click="resetAccount">Reset</button>
    </nav>

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
          transform: 'translate(-50%, -50%)',
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
  padding: 10px;
  background-color: #222;
  color: white;
  display: flex;
  gap: 10px;
  z-index: 10;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
}

.navbar button {
  font-family: inherit;
  font-size: 14px;
  padding: 5px 15px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navbar button:hover {
  background-color: #777;
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
</style>
