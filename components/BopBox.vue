<template>
  <div class="w-full px-4 sm:px-6 py-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 class="text-lg font-semibold">Ending Soon</h1>
      <div class="mt-4 sm:mt-0">
        <button class="px-4 py-2 text-sm bg-red-600 text-white rounded">Participating VP</button>
      </div>
    </div>

    <!-- Proposal Cards -->
    <div v-for="(proposal, index) in proposals" :key="index" class="bg-white shadow rounded-lg mb-4 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div class="flex items-start sm:items-center mb-4 sm:mb-0">
        <img :src="proposal.authorImage" alt="Author" class="h-12 w-12 rounded-full mr-4" />
        <div class="max-w-full">
    <h2 class="font-semibold text-gray-900 text-lg truncate">{{ proposal.title }}</h2>
    <p class="text-sm text-gray-600">By {{ proposal.author }} • {{ proposal.votes }} votes • {{ proposal.comments }} comments • Ends in {{ proposal.timeRemaining }}</p>
</div>

      </div>

      <div class="flex items-center space-x-4">
        <!-- Poll/Draft Badge -->
        <div v-if="proposal.type === 'poll'" class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">POLL</div>
        <div v-if="proposal.type === 'draft'" class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">DRAFT</div>
        
        <!-- VP Status & Vote Button -->
        <p class="text-sm text-gray-700">{{ proposal.thresholdStatus }}</p>
        <button class="text-red-600 font-bold">VOTE</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const proposals = [
  {
    author: 'OZYMANDIAS',
    authorImage: 'https://via.placeholder.com/150',
    title: 'Are Polls a good way of drawing Community...',
    votes: 11,
    comments: 4,
    timeRemaining: '16 hours',
    type: 'poll',
    thresholdStatus: '451,057 VP needed',
  },
  {
    author: 'ZINO',
    authorImage: 'https://via.placeholder.com/150',
    title: 'Deprecation of the current Grants program and...',
    votes: 16,
    comments: 3,
    timeRemaining: '2 days',
    type: 'draft',
    thresholdStatus: '902,049 VP needed',
  },
  {
    author: 'GINOCT',
    authorImage: 'https://via.placeholder.com/150',
    title: 'A shared mission for the Decentraland DAO',
    votes: 15,
    comments: 1,
    timeRemaining: '2 days',
    type: 'draft',
    thresholdStatus: '453,538 VP needed',
  },
  {
    author: 'ZINO',
    authorImage: 'https://via.placeholder.com/150',
    title: 'Establishing an Executive Arm to improve DAO...',
    votes: 16,
    comments: 3,
    timeRemaining: '2 days',
    type: 'draft',
    thresholdStatus: '768,184 VP needed',
  },
];
</script>

<style scoped>
/* Custom styling if needed */
</style>
