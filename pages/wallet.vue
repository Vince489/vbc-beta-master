<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col">
    <div class="container mx-auto px-4 py-8 mt-4">
      <div class="max-w-screen-md mx-auto">
        <!-- Conditional rendering based on gamer data -->
        <template v-if="!gamer">
          <p class="text-center">Loading...</p>
        </template>
        <template v-else>
          <div>
            <div class="text-center mb-4">
              <p class="text-4xl font-semibold pt-14 pb-2">{{ formattedBalance }} VRT</p>
              <p class="text-green-400 font-medium tracking-wider">${{ formattedUSDBalance }} USD</p>
            </div>
            <div class="flex justify-center mb-8">
              <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1" @click="send">Send</button>
              <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1" @click="swap">Swap</button>
              <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1" @click="receive">Receive</button>
            </div>

            <!-- Coin List Container -->
            <div class="coin-list-container max-h-60vh overflow-y-auto pb-8">
              <div v-for="token in tokens" :key="token.acronym" class="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2">
                <div class="flex items-center">
                  <div :class="[token.bgColor, 'token-icon text-3xl']">{{ token.icon }}</div>
                  <div>
                    <div>
                      <span class="font-bold">{{ token.name }}</span>
                    </div>
                    <div class="text-sm text-gray-500">{{ token.acronym }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div><span class="tracking-wider text-gray-200">{{ token.value }}</span></div>
                  <div><span class="text-green-400">{{ token.quantity }}</span></div>
                </div>
              </div>
              <!-- Manage Tokens Link -->
              <div class="text-center mt-4 mb-10 py-2">
                <NuxtLink to="/#manage-tokens" class="text-cyan-500 hover:underline">Manage Token List</NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const gamer = ref(null);

// Watch for changes in the authStore's gamer data
watchEffect(() => {
  gamer.value = authStore.currentGamer;
});

// Example token data; replace this with actual data from your backend or Vuex store
const tokens = ref([
  { icon: 'V', name: 'Virtue', acronym: 'VRT', value: '$412.32', quantity: '50.12', bgColor: 'bg-blue-500' },
  { icon: 'B', name: 'Boxing Nation Token', acronym: 'BNT', value: '$5053.70', quantity: '1.37', bgColor: 'bg-red-900' },
  { icon: 'S', name: 'Solana', acronym: 'SOL', value: '$700.25', quantity: '2.51', bgColor: 'bg-yellow-500' },
  { icon: 'E', name: 'Ethereum', acronym: 'ETH', value: '$2000.40', quantity: '0.80', bgColor: 'bg-blue-700' },
  { icon: 'B', name: 'Bitcoin', acronym: 'BTC', value: '$40000.00', quantity: '0.56', bgColor: 'bg-yellow-400' },
  { icon: 'B', name: 'Virtron Stable Token', acronym: 'VSTA', value: '$4034.00', quantity: '4034', bgColor: 'bg-green-400' },
]);

// Watch for changes in the authStore's gamer data
onMounted(() => {
  gamer.value = authStore.currentGamer;
});

const formattedBalance = computed(() => {
  return gamer.value && gamer.value.account && gamer.value.account.vrtAccount
    ? (gamer.value.account.vrtAccount.balance / 100).toFixed(2)
    : '0.00';
});

const formattedUSDBalance = computed(() => {
  return gamer.value && gamer.value.account && gamer.value.account.vrtAccount
    ? (gamer.value.account.vrtAccount.balance / 10000).toFixed(2)
    : '0.00';
});

function send() {
  // Logic for sending tokens
}

function swap() {
  // Logic for swapping tokens
}

function receive() {
  // Logic for receiving tokens
}
</script>

<style scoped>
.token-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.coin-list-container {
  max-height: 60vh;
  overflow-y: auto;
  padding-bottom: 2rem;
}
</style>
