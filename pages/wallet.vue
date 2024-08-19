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
              <p class="text-4xl font-semibold pt-8 pb-2">{{ formattedBalance }} VRT</p>
              <p class="text-green-400 font-medium tracking-wider">${{ formattedUSDBalance }} USD</p>
            </div>
            <div class="flex justify-center pb-4 mb-8">
              <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1" @click="send">Send</button>
              <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1" @click="swap">Swap</button>
              <button class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded-lg mx-1" @click="airdrop">Airdrop</button>
            </div>

            <!-- Coin List Container -->
            <div class="coin-list-container max-h-60vh overflow-y-auto pb-8">
              <div v-for="token in tokens" :key="token.symbol" class="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2">
                <div class="flex items-center">
                  <img :src="token.icon" alt="Token Icon" class="token-icon" />
                  <div>
                    <div>
                      <span class="font-bold">{{ token.name }}</span>
                    </div>
                    <div class="text-sm text-gray-400">{{ token.symbol }}</div>
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
const tokens = ref([]);

// Watch for changes in the authStore's gamer data
watchEffect(() => {
  gamer.value = authStore.currentGamer;

  // Extract VRT and token data from the gamer object
  if (gamer.value && gamer.value.account) {
    const vrtAccount = gamer.value.account.vrtAccount;
    
    if (vrtAccount && vrtAccount.coin) {
      // Add VRT token to the tokens array
      tokens.value.push({
        name: vrtAccount.coin.name, // Use the actual name of the VRT token
        symbol: vrtAccount.coin.symbol, // Use the acronym or symbol of the VRT token
        icon: vrtAccount.coin.icon, // Use the icon of the VRT token
        value: formattedBalance.value, // Add the formatted balance
        quantity: gamer.value.account.vrtAccount.balance, // Assuming quantity is the balance
      });
    }

    // If there are token accounts, add them to the tokens array
    if (gamer.value.account.tokenAccount && gamer.value.account.tokenAccount.length > 0) {
      for (const tokenAccount of gamer.value.account.tokenAccount) {
        if (tokenAccount.token) {
          tokens.value.push({
            name: tokenAccount.token.name,
            symbol: tokenAccount.token.symbol,
            icon: tokenAccount.token.icon, // Assuming each token has an icon property
            value: tokenAccount.value, // Assuming tokenAccount has a value field
            quantity: tokenAccount.quantity, // Assuming tokenAccount has a quantity field
          });
        }
      }
    }
  }
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

function airdrop() {
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
.coin-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
</style>
