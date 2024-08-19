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
          <span :class="resultClass(bout.result)" class="px-2 py-1 rounded-full">{{ bout.result }}</span>
        </div>
        <div class="flex justify-between items-center">

          <span class="text-gray-400">{{ bout.method }} ({{ bout.round }}/12)</span>
        </div>
        <button @click="toggleDetails(bout._id)" class="text-blue-500 mt-2">Toggle Details</button>
        <div v-if="showDetails === bout._id" class="mt-4 bg-gray-700 p-4 rounded-lg">
          <p><strong>{{ bout.opponent.gamerTag }} KDs:</strong> {{ bout.opponentKnockDowns }} </p>
          <p><strong>{{ bout.fighter.gamerTag }} KDs:</strong> {{ bout.fighterKnockDowns }} </p>
          <p><strong>Opponent OVR:</strong> {{ bout.opponentOVR }}</p>
          <p><strong>Fighter OVR:</strong> {{ bout.fighterOVR }}</p>
          <p><strong>Opponent Weight:</strong> {{ bout.oppWgt }} lbs</p>
          <p><strong>Fighter Weight:</strong> {{ bout.fighterWgt }} lbs</p>
          <p><strong>Venue:</strong> {{ bout.venue }}</p>
          <p><strong>Purse:</strong> ${{ bout.purse }}</p>
          <p><strong>Score Cards:</strong> {{ bout.scoreCards }}</p>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const uri = `https://vbc-login-production.up.railway.app/api/v1/fighter/${id}`;

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

const fetchFighter = async () => {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error('Failed to fetch fighter data');
    }
    const data = await response.json();
    fighter.value = data.fighter;
    fighterStats.value = {
      Earnings: `$ ${fighter.value.earnings}`,
      Wins: fighter.value.wins,
      Losses: fighter.value.losses,
      Draws: fighter.value.draws,
      KOs: fighter.value.knockouts,
      'Losses by KO': fighter.value.lossesByKnockout,
      Fights: fighter.value.fights,
      Rounds: fighter.value.rounds
    };
    bouts.value = fighter.value.bouts; // Update bouts with the fetched data
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchFighter();
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
