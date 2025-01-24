<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Compteur de feuilles
const leaves = ref(0);

// Compteur d'ouvrières
const workers = ref(0);

// Coût actuel d'une ouvrière
const workerCost = ref(10);

// Fonction pour charger les données depuis le localStorage
const loadFromLocalStorage = () => {
  const savedLeaves = localStorage.getItem('leaves');
  const savedWorkers = localStorage.getItem('workers');
  const savedWorkerCost = localStorage.getItem('workerCost');

  if (savedLeaves) leaves.value = parseInt(savedLeaves, 10);
  if (savedWorkers) workers.value = parseInt(savedWorkers, 10);
  if (savedWorkerCost) workerCost.value = parseInt(savedWorkerCost, 10);
};

// Sauvegarder les données dans le localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('leaves', leaves.value.toString());
  localStorage.setItem('workers', workers.value.toString());
  localStorage.setItem('workerCost', workerCost.value.toString());
};

// Fonction pour augmenter le nombre de feuilles au clic
const handleClick = () => {
  leaves.value++;
};

// Fonction pour recruter des ouvrières
const recruitWorker = () => {
  if (leaves.value >= workerCost.value) {
    workers.value++;
    leaves.value -= workerCost.value;

    // Augmenter le coût pour la prochaine ouvrière (exemple : +20% à chaque achat)
    workerCost.value = Math.ceil(workerCost.value * 1.2);
  }
};

// Production de feuilles par ouvrière
onMounted(() => {
  // Charger les données depuis le localStorage au montage
  loadFromLocalStorage();

  // Produire automatiquement des feuilles
  setInterval(() => {
    leaves.value += workers.value;
  }, 1000);
});

// Surveiller les changements de leaves, workers et workerCost pour les sauvegarder
watch([leaves, workers, workerCost], saveToLocalStorage);
</script>

<template>
  <div class="game-container">
    <div class="banner">
      <p>Ant Queendom</p>
    </div>
    <div class="game-panel">
      <p class="resource-display">You have {{ leaves }} leaves</p>
      <p class="rate-display">(+{{ workers }} leaves/s)</p>
      <button @click="handleClick">Collect leaves</button>
      <button @click="recruitWorker" :disabled="leaves < workerCost">
        Recruit Worker ({{ workerCost }} leaves)
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur général avec un style rétro */
.game-container {
  width: 400px;
  margin: 0 auto;
  padding: 15px;
  background-color: #c0c0c0;
  border: 2px solid black;
  box-shadow: 4px 4px 0px black, -2px -2px 0px white inset;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Bannière rétro */
.banner {
  background-color: #008000;
  color: white;
  text-align: center;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 0px black;
}

/* Panel principal */
.game-panel {
  background-color: #e0e0e0;
  border: 2px solid black;
  padding: 10px;
  box-shadow: 2px 2px 0px black inset, -2px -2px 0px white inset;
}

/* Affichage des ressources */
.resource-display {
  font-weight: bold;
}

.rate-display {
  font-size: 12px;
  margin-bottom: 10px;
  color: #555;
}

/* Boutons avec un style rétro */
button {
  font-family: inherit;
  font-size: 14px;
  padding: 5px 10px;
  background-color: #d3d3d3;
  border: 2px solid black;
  color: black;
  cursor: pointer;
  box-shadow: 2px 2px 0px black, -1px -1px 0px white inset;
  text-shadow: 1px 1px 0px white;
  margin-bottom: 5px;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #c0c0c0;
}

button:active {
  box-shadow: 1px 1px 0px black inset;
}

button:disabled {
  background-color: #aaa;
  color: #666;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
