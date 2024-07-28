<template>
  <div class="container mx-auto p-4">
    <div v-if="fighter" class="max-w-lg mx-auto bg-gray-900 text-white shadow-md rounded-lg overflow-hidden">
      <div class="bg-cover bg-center h-56 p-4" :style="{ backgroundImage: `url(${fighter.image})` }">
        <div class="flex justify-end">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{ fighter.weightClass }}
          </span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center">
          <NuxtImg :src="fighter.image" alt="Fighter Image" class="w-24 h-24 rounded-full border-4 border-gray-900 -mt-12" />
          <div class="ml-4">
            <h1 class="text-2xl font-semibold">{{ fighter.firstName }} {{ fighter.lastName }} </h1>
            <p class="text-blue-200">@{{ fighter.gamerTag }}</p>
            <p class="text-gray-400 italic">{{ fighter.nickname }}</p>
          </div>
        </div>
        <div class="mt-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Height</p>
              <p class="font-semibold">{{ fighter.heightFt }}'{{ fighter.heightIn }}''</p>
            </div>
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Reach</p>
              <p class="font-semibold">{{ fighter.reach }} in</p>
            </div>
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Stance</p>
              <p class="font-semibold">{{ fighter.stance }}</p>
            </div>
            <div class="bg-gray-800 p-2 rounded">
              <p class="text-gray-400">Overall</p>
              <p class="font-semibold">{{ fighter.ovr }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-800">
                <th class="px-4 py-2">Stat</th>
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

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fighter = ref({
  firstName: 'John',
  lastName: 'Doe',
  gamerTag: 'JohnD123',
  nickname: 'The Destroyer',
  heightFt: 6,
  heightIn: 2,
  reach: 74,
  stance: 'Orthodox',
  ovr: 85,
  weightClass: 'Middleweight',
  image: 'https://via.placeholder.com/150',
  earnings: 50000,
  wins: 20,
  losses: 2,
  draws: 1,
  knockouts: 15,
  lossesByKnockout: 1,
  fights: 23,
  rounds: 120,
});

const fighterStats = ref({
  Earnings: `$${fighter.value.earnings}`,
  Wins: fighter.value.wins,
  Losses: fighter.value.losses,
  Draws: fighter.value.draws,
  Knockouts: fighter.value.knockouts,
  'Losses by KO': fighter.value.lossesByKnockout,
  Fights: fighter.value.fights,
  Rounds: fighter.value.rounds
});

const bouts = ref([
  {
    id: 1,
    opponent: 'Jake Paul',
    result: 'Win',
    method: 'KO',
    round: 3,
    knockdowns: 2,
    opponentOVR: 80,
    fighterOVR: 85,
    oppWgt: 160,
    fighterWgt: 158,
    date: '2023-06-12',
    venue: 'Madison Square Garden',
    purse: 20000,
    scoreCards: '29-28, 30-27, 29-28',
    punchStats: '100/200'
  },
  {
    id: 2,
    opponent: 'Mike Tyson',
    result: 'Loss',
    method: 'TKO',
    round: 5,
    knockdowns: 3,
    opponentOVR: 90,
    fighterOVR: 85,
    oppWgt: 165,
    fighterWgt: 158,
    date: '2023-01-20',
    venue: 'Staples Center',
    purse: 30000,
    scoreCards: '48-47, 48-47, 48-47',
    punchStats: '150/300'
  }
]);

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

onMounted(() => {
  // The fighter and bouts data is already set as dummy data.
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
.bouts h2 {
  color: #ffffff;
  margin-bottom: 1rem;
}
button {
  cursor: pointer;
}
</style>
