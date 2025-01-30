<script setup lang="ts">
import { useUnlockedStepStore } from '@/stores/unlockedStepsStore.ts'
import { useWarStore } from '@/stores/warStore.ts'

const unlockedStepStore = useUnlockedStepStore()
const warStore = useWarStore()
</script>

<template>
  <div v-if="unlockedStepStore.offenseAndDefenseUnlocked" class="game-container" :class="{ attacked: isAttacked }">
    <div class="banner">
      <p>Foods</p>
    </div>

    <div class="game-panel">
      <p class="resource-display">
        You have
        {{
          warStore.foods > 1000000
            ? warStore.foods.toExponential(2)
            : warStore.foods > 1000
              ? Math.round(warStore.foods)
              : warStore.foods
        }}
        foods
      </p>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/clicker.css';

.game-container {
  width: 400px;
}

.banner {
  background-color: #800000;
}

button {
  align-items: center;
}
</style>
