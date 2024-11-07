<template>
  <div class="p-6 rounded-lg shadow-lg m-4 max-w-md w-full mx-auto mt-12">
    <h1 class="text-3xl font-semibold text-center mb-4 text-gray-800">Setup Your Secret Recovery Phrase</h1>
    <p class="text-center mb-6 text-gray-300">Generate your 12-word Seed Phrase. This is the only way to recover your wallet. Do not share it with anyone. Store it in a safe place.</p>
    <div id="seed-phrase-container" class="p-5 rounded-lg mb-6 text-sm font-medium text-gray-700 grid grid-cols-3 gap-3">
      <span v-for="(word, index) in walletStore.seedPhraseWords" :key="index" class="bg-gray-200 p-2 rounded">
        {{ index + 1 }}. {{ word }}
      </span>
    </div>
    <div class="flex justify-center mb-4">
      <button @click="walletStore.generateSeedPhrase" 
              :disabled="walletStore.isGenerated" 
              class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              :class="{'opacity-50 cursor-not-allowed': walletStore.isGenerated}">
        Generate Secret Recovery Phrase
      </button>
    </div>
    <div v-if="walletStore.seedPhraseWords.length" class="mt-6">
      <div class="flex items-center mb-4">
        <input id="saved-phrase-checkbox" type="checkbox" v-model="walletStore.isPhraseSaved" class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
        <label for="saved-phrase-checkbox" class="ml-3 text-gray-700">I saved my Secret Recovery Phrase</label>
      </div>
      <div class="flex justify-between">
        <button @click="walletStore.copySeedPhrase" class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">Copy</button>
        <button @click="continueToWallet" :disabled="!walletStore.isPhraseSaved" class="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition" :class="{'opacity-50 cursor-not-allowed': !walletStore.isPhraseSaved}">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useWalletStore } from '../stores/walletStore'; // Adjust the path as necessary

export default {
  setup() {
    const walletStore = useWalletStore();

    const continueToWallet = () => {
      window.location.href = "/wallet";
    };

    return { walletStore, continueToWallet };
  },
};
</script>
