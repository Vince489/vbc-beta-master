<template>
  <div class="p-6 max-w-2xl mx-auto rounded-xl shadow-lg space-y-4">
    <h2 class="text-2xl font-bold text-center text-gray-300">Official Bout Contract</h2>
    <!-- Boxer vs Opponent -->
    <div class="flex flex-col sm:flex-row justify-around items-center mb-4">
      <div class="text-center mb-4 sm:mb-0">
        <p class="text-lg font-semibold">Name: Bob Bopper</p>
        <p class="text-gray-300 text-lg ">Gamer Tag: BIbby12</p>
        <p class="text-gray-300 text-sm">ID: 04mkec49f1b1f1a1a1a1a2j5</p>
      </div>
      <div class="text-center mb-4 sm:mb-0">
        <h3 class="text-xl font-semibold">vs</h3>
      </div>
      <div class="text-center">
        <p class="text-lg font-semibold">Name: Chris Cutter</p>
        <p class="text-gray-300 text-lg">Gamer Tag: Chrissy</p>
        <p class="text-gray-300 text-sm">ID: 60d5ec49f1b1f1a1a1a1a3</p>
      </div>
    </div>
    <!-- Venue and Title -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Venue:</h3>
      <p class="text-gray-300 text-sm">Madison Square Garden</p>
      <h3 class="text-lg font-semibold mt-2">Title:</h3>
      <p class="text-gray-300 text-sm">World Heavyweight Championship</p>
    </div>
    <!-- Fight Details -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <h4 class="text-lg font-semibold">Rounds:</h4>
        <p class="text-gray-300">12</p>
      </div>
      <div>
        <h4 class="text-lg font-semibold">Contract Weight:</h4>
        <p class="text-gray-300">200 lbs</p>
      </div>
      <div>
        <h4 class="text-lg font-semibold">Boxer's Purse:</h4>
        <p class="text-gray-300">$5,000,000</p>
      </div>
      <div>
        <h4 class="text-lg font-semibold">Opponent's Purse:</h4>
        <p class="text-gray-300">$3,000,000</p>
      </div>
    </div>
    <!-- Additional Details -->
    <div class="mb-4">
      <h4 class="text-lg font-semibold">Rules:</h4>
      <p class="text-gray-300 text-sm">Standard rules</p>
    </div>
    <div class="mb-4">
      <h4 class="text-lg font-semibold">Bonuses:</h4>
      <p class="text-gray-300 text-sm">Knockout bonus</p>
    </div>
    <div class="mb-4">
      <h4 class="text-lg font-semibold">Promotion Requirements:</h4>
      <p class="text-gray-300 text-sm">Press conference</p>
    </div>
    <div class="mb-4">
      <h4 class="text-lg font-semibold">Bout Status:</h4>
      <p class="text-gray-300 text-sm">Pending</p>
    </div>
  </div>
</template>

<script setup>
const bout = {
  boxerGamerTag: "BIbby12",
  boxerName: "Bob Bopper",
  boxerId: "04mkec49f1b1f1a1a1a1a2j5",
  opponentGamerTag: "Chrissy",
  opponentName: "Chris Cutter",
  opponentId: "60d5ec49f1b1f1a1a1a1a3",
  dateOfBout: {
    month: 10,
    day: 11,
    year: 2024
  },
  venueName: "Madison Square Garden",
  titleBout: "yes",
  titleDetails: "World Heavyweight Championship",
  rounds: 12,
  contractWeight: 200,
  boxerPurse: 5000000,
  opponentPurse: 3000000,
  rules: "Standard rules",
  bonuses: "Knockout bonus",
  promotionRequirements: "Press conference",
  boutStatus: "pending",
  _id: "66c4d3b2c40644be51ecabb5",
  __v: 0
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>