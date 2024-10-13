<template>
  <div class="mt-6">
    <h2 class="text-lg font-semibold">Bouts</h2>
    <div v-if="bouts.length === 0" class="text-gray-400">No bouts available.</div>
    <div v-for="bout in bouts" :key="bout._id" class="bg-gray-800 my-2 p-4 rounded">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold">Fighter A: {{ bout.fighterAName }} vs Fighter B: {{ bout.fighterBName }}</p>
          <p class="text-gray-400">Date: {{ formatDate(bout.date) }}</p>
        </div>
        <button @click="toggleDetails(bout._id)" class="text-blue-400">
          <span v-if="showDetails !== bout._id">Show Details</span>
          <span v-else>Hide Details</span>
        </button>
      </div>
      <div v-if="showDetails === bout._id" class="mt-2">
        <p class="text-gray-400">Venue: {{ bout.venue }}</p>
        <p class="text-gray-400">Purse: ${{ bout.purse }}</p>
        <p class="text-gray-400">Method: {{ bout.method }}</p>
        <p class="text-gray-400">Winner: {{ bout.winner }}</p>
        <p class="text-gray-400">Scorecards: {{ bout.scoreCards || 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  bouts: {
    type: Array,
    required: true
  }
});

const showDetails = ref(null);

const toggleDetails = (id) => {
  showDetails.value = showDetails.value === id ? null : id;
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
