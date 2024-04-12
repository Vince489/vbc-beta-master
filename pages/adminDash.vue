<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Admin Dashboard</h1>

    <!-- Display a list of fighters -->
    <div v-for="fighter in fighters" :key="fighter._id" class="border p-4 mb-4 rounded shadow">
      <img :src="fighter.image" alt="Fighter Image" class="w-20 h-20 rounded-full mx-auto mb-2" />
      <h2 class="text-lg font-semibold text-center">{{ fighter.nickname }}</h2>
      <p class="text-gray-500 text-center">{{ fighter.firstName }} {{ fighter.lastName }}</p>

      <!-- Edit fighter's records and bouts -->
      <div class="mt-4">
        <label class="block font-semibold">Wins:</label>
        <input v-model="fighter.wins" type="number" class="border rounded p-2 mb-2" />

        <label class="block font-semibold">Losses:</label>
        <input v-model="fighter.losses" type="number" class="border rounded p-2 mb-2" />

        <!-- Add more fields as needed for editing other fighter information -->

        <button @click="updateFighter(fighter)" class="bg-blue-500 text-white rounded p-2">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fighters: [],
    };
  },
  async created() {
    try {
      const response = await fetch('https://virtron-production.up.railway.app/fighters/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.fighters = data; // Update the fighters array with the fetched data
      } else {
        console.error('Failed to fetch fighters:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching fighters:', error);
    }
  },
  methods: {
    async updateFighter(fighter) {
      // Implement the code to update a fighter's information in the backend.
      try {
        const response = await fetch(`https://your-api-endpoint.com/api/fighters/${fighter._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wins: fighter.updatedWins,
            losses: fighter.updatedLosses,
          }),
        });

        if (response.ok) {
          // Update the local data after a successful update
          fighter.wins = fighter.updatedWins;
          fighter.losses = fighter.updatedLosses;
        } else {
          console.error('Failed to update fighter record:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating fighter record:', error);
      }
    },
  },
};
</script>

