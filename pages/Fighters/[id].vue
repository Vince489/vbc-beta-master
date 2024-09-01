<template>
  <div class="container mx-auto p-4">
    <div v-if="fighter" class="max-w-lg mx-auto bg-gray-900 text-white shadow-md rounded-lg overflow-hidden">
      <div class="bg-cover bg-center h-56 p-4" :style="{ backgroundImage: `url(/img/w-o.png)` }">
        <div class="flex justify-end">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{ fighter.weightClass }}
          </span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center">
          <img :src="fighter.image" alt="Avatar" class="w-24 h-24 rounded-full border-4 border-gray-900 -mt-12" />
          <div class="ml-4">
            <h1 class="text-2xl font-semibold">{{ fighter.firstName }} {{ fighter.lastName }}</h1>
            <p class="text-blue-200">@{{ fighter.gamerTag }}</p>
            <p class="text-gray-400 italic">{{ fighter.nickname }}</p>
            <p class="text-sm text-gray-400">ID# {{ fighter._id }}</p>
          </div>
        </div>
        <div class="mt-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Height</p>
              <p class="font-semibold">{{ fighter.heightFt }}'{{ fighter.heightIn }}"</p>
            </div>
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Reach</p>
              <p class="font-semibold">{{ fighter.reach }}"</p>
            </div>
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Rank#</p>
              <p class="font-semibold">{{ fighter.rank }}</p>
            </div>
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Legacy</p>
              <p class="font-semibold">{{ fighter.legacy?.status || 'N/A' }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-800">
                <th class="px-4 py-2">Stats</th>
                <th class="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, label) in fighterStats" :key="label" class="border-t border-gray-700">
                <td class="px-4 py-2">{{ label }}</td>
                <td class="px-4 py-2">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <!-- Bouts Display -->
    <div class="bouts mt-8">
      <h2 class="text-2xl font-semibold text-white mb-4">Bouts</h2>
      <div v-for="bout in bouts" :key="bout._id" class="bg-gray-900 p-4 mb-4 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-400">{{ formatDate(bout.date) }}</span>
          <span :class="resultClass(bout.result)" class="px-2 py-1 rounded-full">{{ bout.method }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-400">{{ bout.method || 'N/A' }} ({{ bout.roundEnded }}/{{ bout.scheduledRounds }})</span>
        </div>
        <button @click="toggleDetails(bout._id)" class="text-blue-500 mt-2">Toggle Details</button>
        <div v-if="showDetails === bout._id" class="mt-4 bg-gray-700 p-4 rounded-lg">
          <p><strong>{{ bout.fighterA.gamerTag }} KDs:</strong> {{ bout.fighterANumTimesKnockedDown }}</p>
          <p><strong>{{ bout.fighterB.gamerTag }} KDs:</strong> {{ bout.fighterBNumTimesKnockedDown }}</p>
          <p><strong>{{ bout.fighterB.gamerTag }} OVR:</strong> {{ bout.fighterBOVR }}</p>
          <p><strong>{{ bout.fighterA.gamerTag }} OVR:</strong> {{ bout.fighterAOVR }}</p>
          <p><strong>{{ bout.fighterB.gamerTag }} Weight:</strong> {{ bout.fighterBWgt }} lbs</p>
          <p><strong>{{ bout.fighterA.gamerTag }} Weight:</strong> {{ bout.fighterAWgt }} lbs</p>
          <p><strong>Venue:</strong> {{ bout.venue }}</p>
          <p><strong>Purse:</strong> ${{ bout.purse }}</p>
          <p><strong>Score Cards:</strong> {{ bout.judges }}</p>
          <p><strong>Punch Stats:</strong> {{ bout.punchStats }}</p>
        </div>
      </div>
    </div>

    <!-- Display Boxer Team -->
    <div class="team mt-8">
      <h2 class="text-2xl font-semibold text-white mb-4">Team</h2>
      <template>
        <Tabs default-value="account" class="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">
              Account
            </TabsTrigger>
            <TabsTrigger value="password">
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">
            Change your password here.
          </TabsContent>
        </Tabs>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore'; // Adjust the import based on your file structure

const authStore = useAuthStore();
const fighter = ref(null);
const bouts = ref([]);
const showDetails = ref(null);

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const toggleDetails = (id) => {
  showDetails.value = showDetails.value === id ? null : id;
};

const resultClass = (result) => {
  return result === 'Win' ? 'bg-green-500' : result === 'Loss' ? 'bg-red-500' : 'bg-yellow-500';
};

const fighterStats = ref({});



watch(
  () => authStore.currentGamer, // Reactive source to watch
  (newGamer) => { // Callback function that runs when `authStore.currentGamer` changes
    console.log('Current Gamer changed:', newGamer);

    if (newGamer && newGamer.fighters.length > 0) {
      const firstFighter = newGamer.fighters[0];

      console.log('First Fighter:', firstFighter);

      fighter.value = firstFighter; // Directly set `fighter` to the first fighter

      // Handle bouts if they exist
      if (firstFighter.bouts && firstFighter.bouts.length > 0) {
        bouts.value = firstFighter.bouts;
        console.log('Bouts:', bouts.value);
      } else {
        bouts.value = []; // Default to empty array if no bouts are found
        console.log('No bouts found.');
      }

      // Populate `fighterStats` from fighter data
      fighterStats.value = { 
        Earnings: `$ ${firstFighter.earnings || '0'}`, // Ensure default value
        Wins: firstFighter.wins || 0,
        Losses: firstFighter.losses || 0,
        Draws: firstFighter.draws || 0,
        KOs: firstFighter.knockouts || 0,
        'Losses by KO': firstFighter.lossesByKnockout || 0,
        Fights: firstFighter.fights || 0,
        Rounds: firstFighter.rounds || 0
      };

      console.log('Fighter Stats:', fighterStats.value);
    } else {
      console.log('No fighters available.');
      fighter.value = null; // Clear fighter if no fighters
      bouts.value = [];
      fighterStats.value = {};
    }
  },
  { immediate: true } // Run the watcher immediately on initial setup
);



onMounted(async () => {
  try {
    await authStore.fetchGamerData();
  } catch (error) {
    console.error('Error fetching gamer data:', error.message);
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
