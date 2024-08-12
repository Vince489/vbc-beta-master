<template>
  <div class="bg-gray-900 text-white h-screen overflow-hidden">

    <div class="container mx-auto px-4 py-8 mt-4">
      <div class="max-w-screen-md mx-auto">
        <div class="text-center mb-4">
          <p class="text-4xl font-semibold pt-10 pb-6">$10,052.23</p>
          <!-- <p class="text-green-400 font-medium tracking-wider">1,005,223.42 VRT</p> -->
        </div>
        <div class="flex justify-center mb-8">
          <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1">Send</button>
          <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1">Swap</button>
          <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1">Buy</button>
        </div>

        <!-- Coin List Container -->
        <div class="coin-list-container max-h-[60vh] overflow-y-auto pb-8" id="coin-list-container">
          <!-- Token items will be dynamically populated here -->
        </div>

      </div>
    </div>

    <!-- Include bottom navigation -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const tokens = [
    { icon: 'V', name: 'Virtue', acronym: 'VRT', value: '$412.32', quantity: '50.12', bgColor: 'bg-blue-500' },
    { icon: 'B', name: 'Boxing Nation Token', acronym: 'BNT', value: '$5053.70', quantity: '1.37', bgColor: 'bg-red-900' },
    { icon: 'S', name: 'Solana', acronym: 'SOL', value: '$700.25', quantity: '2.51', bgColor: 'bg-yellow-500' },
    { icon: 'E', name: 'Ethereum', acronym: 'ETH', value: '$2000.40', quantity: '0.80', bgColor: 'bg-blue-700' },
    { icon: 'B', name: 'Bitcoin', acronym: 'BTC', value: '$40000.00', quantity: '0.56', bgColor: 'bg-yellow-400' },
    { icon: 'B', name: 'Virtron Stable Token', acronym: 'VSTA', value: '$4034.00', quantity: '4034', bgColor: 'bg-green-400' },
  ];

  const coinListContainer = document.getElementById('coin-list-container');

  tokens.forEach(token => {
    const tokenElement = document.createElement('div');
    tokenElement.className = 'flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2';
    tokenElement.innerHTML = `
      <div class="flex items-center"> <!-- Left side -->
        <div class="${token.bgColor} w-12 h-12 rounded-full flex items-center justify-center text-3xl mr-4">${token.icon}</div>
        <div>
          <div>
            <span class="font-bold">${token.name}</span>
          </div>
          <div class="text-sm text-gray-500">${token.acronym}</div>
        </div>
      </div>
      <div class="text-right"> <!-- Right side -->
        <div><span class="tracking-wider text-gray-200">${token.value}</span></div>
        <div><span class="text-green-400">${token.quantity}</span></div>
      </div>
    `;
    coinListContainer.appendChild(tokenElement);
  });
});
</script>

<style scoped>
.coin-list-container {
  max-height: 60vh; /* Adjust the height as needed */
  overflow-y: auto;
  padding-bottom: 2rem; /* Add padding to the bottom to prevent content from being hidden */
}
</style>
