<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4">Leaderboard</h1>

    <div>
      <label for="weightClass" class="block mb-2 text-gray-200">Select Weight Class:</label>
      <select
        v-model="selectedWeightClass"
        @change="fetchLeaderboard"
        class="p-2 border border-gray-400 rounded bg-gray-700 text-gray-200"
      >
        <option v-for="weightClass in weightClasses" :key="weightClass.value" :value="weightClass.value">
          {{ weightClass.label }}
        </option>
      </select>
    </div>

    <div class="overflow-x-auto mt-4">
      <table v-if="fighters.length" class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-600 text-left">
            <th class="py-2 px-4 border">Rank</th>
            <th class="py-2 px-4 border">Gamer Tag</th>
            <th class="py-2 px-4 border">Rating</th>
            <th class="py-2 px-4 border">W-L-D</th>
          </tr>
        </thead>
        <tbody class="bg-gray-500">
          <tr v-for="(fighter, index) in sortedFighters" :key="fighter.gamerTag + '-' + index">
            <td class="py-2 px-4 border">
              {{ fighter.rank === 'champ' ? 'Champ' : fighter.rank > 0 ? fighter.rank : 'NR' }}
            </td>
            <td class="py-2 px-4 border">{{ fighter.gamerTag }}</td>
            <td class="py-2 px-4 border">{{ fighter.rating }}</td>
            <td class="py-2 px-4 border">
              {{ fighter.wins }}-{{ fighter.losses }}-{{ fighter.draws }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center py-8">
        <p class="text-gray-200">No fighters available for the selected weight class.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fighters: [],
      selectedWeightClass: 'Lightweight', // Default weight class
      weightClasses: [
        { value: 'Minimum', label: 'Minimum (105 lbs)' },
        { value: 'Light Flyweight', label: 'Light Flyweight (108 lbs)' },
        { value: 'Flyweight', label: 'Flyweight (112 lbs)' },
        { value: 'Super Flyweight', label: 'Super Flyweight (115 lbs)' },
        { value: 'Bantamweight', label: 'Bantamweight (118 lbs)' },
        { value: 'Super Bantamweight', label: 'Super Bantamweight (122 lbs)' },
        { value: 'Featherweight', label: 'Featherweight (126 lbs)' },
        { value: 'Super Featherweight', label: 'Super Featherweight (130 lbs)' },
        { value: 'Lightweight', label: 'Lightweight (135 lbs)' },
        { value: 'Super Lightweight', label: 'Super Lightweight (140 lbs)' },
        { value: 'Welterweight', label: 'Welterweight (147 lbs)' },
        { value: 'Super Welterweight', label: 'Super Welterweight (154 lbs)' },
        { value: 'Middleweight', label: 'Middleweight (160 lbs)' },
        { value: 'Super Middleweight', label: 'Super Middleweight (168 lbs)' },
        { value: 'Light Heavyweight', label: 'Light Heavyweight (175 lbs)' },
        { value: 'Cruiserweight', label: 'Cruiserweight (200 lbs)' },
        { value: 'Heavyweight', label: 'Heavyweight (200+ lbs)' }
      ]
    };
  },
  computed: {
    sortedFighters() {
      return this.fighters.sort((a, b) => {
        if (a.rank === 'champ' && b.rank !== 'champ') return -1;
        if (b.rank === 'champ' && a.rank !== 'champ') return 1;
        return (a.rank > 0 ? a.rank : Infinity) - (b.rank > 0 ? b.rank : Infinity);
      });
    }
  },
  methods: {
    async fetchLeaderboard() {
      try {
        const response = await fetch(`https://vbc-login-production.up.railway.app/api/v1/fighter/leaderboard/${this.selectedWeightClass}`);
        if (response.ok) {
          const data = await response.json();
          this.fighters = data.fighters; // Assuming the API returns fighters in a "fighters" array
        } else {
          console.error('Failed to fetch leaderboard data');
          this.fighters = [];
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        this.fighters = [];
      }
    }
  },
  mounted() {
    this.fetchLeaderboard(); // Load leaderboard on page load
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  padding: 16px;
}

/* Styles for mobile responsiveness */
@media (max-width: 640px) {
  h1 {
    font-size: 2rem; /* Adjust font size for mobile */
  }

  .p-2 {
    padding: 1rem; /* Increase padding for touch targets */
  }

  th,
  td {
    padding: 0.5rem; /* Adjust table cell padding */
    font-size: 0.875rem; /* Smaller font size for table text */
  }
}

/* Additional styles for dropdown options can be added here */
</style>
