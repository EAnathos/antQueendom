<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)

const handleClick = () => {
  clicks.value++
}
</script>

<template>
  <div class="ant-clicker">
    <button @click="handleClick">Click moi</button>
    <p>Cliques : {{ clicks }}</p>
  </div>
</template>

<style scoped>
.ant-clicker {
  width: 100px;
  height: 50px;
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 2px solid black;
  border-radius: 8px;
  user-select: none;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
