<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <!-- Heading -->
    <h1 class="text-3xl font-bold text-center text-gray-800">Boxing Bouts Contracts</h1>

    <!-- Search Bar -->
    <div class="flex justify-center mb-6">
      <input
        type="text"
        v-model="searchTerm"
        @input="searchContracts"
        placeholder="Search by ID or Fighter..."
        class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <!-- Contract List -->
    <div class="flex flex-wrap gap-4 justify-center">
      <button
        v-for="contract in filteredContracts"
        :key="contract.id"
        class="p-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        @click="viewContract(contract.id)"
      >
        <h3 class="text-lg font-semibold">{{ contract.title }}</h3>
        <p class="text-sm text-gray-200">ID: {{ contract.id }}</p>
        <p class="text-sm text-gray-200">Fighter: {{ contract.fighterName }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Mock data for demonstration
const contracts = [
  { id: '1', title: 'Heavyweight Title Fight', fighterName: 'Bob Bopper' },
  { id: '2', title: 'Middleweight Clash', fighterName: 'Chris Cutter' },
  // Add more mock contracts as needed
];

const searchTerm = ref('');
const filteredContracts = computed(() => {
  if (!searchTerm.value) return contracts;
  return contracts.filter(contract =>
    contract.id.includes(searchTerm.value) ||
    contract.fighterName.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

function searchContracts() {
  // Triggered on input change, handled by computed property
}

function viewContract(id) {
  // Navigate to the contract details page
  // You might use this.$router.push or a similar method based on your routing setup
  console.log(`View contract with ID: ${id}`);
}
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
