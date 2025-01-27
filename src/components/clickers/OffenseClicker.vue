<script setup lang="ts">
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'

const unlockedStepStore = useUnlockedStepStore()
</script>

<template>
  <div v-if="unlockedStepStore.offenseAndDefenseUnlocked" class="game-container">
    <div class="banner">
      <p>Offense</p>
    </div>
    <div class="game-panel"></div>
  </div>
</template>

<style scoped>
@import '../../assets/clicker.css';

.game-container {
  width: 400px;
}

.banner {
  background-color: #800013;
}
</style>
