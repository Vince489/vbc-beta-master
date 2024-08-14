<template>
  <div class="bg-white p-6 rounded-lg shadow-lg m-2 max-w-md w-full mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-4">Setup Your Secret Recovery Phrase</h1>
    <p class="text-center mb-6">This is the only way to recover your wallet. Do not share it with anyone.</p>
    <div id="seed-phrase-container" class="bg-gray-100 p-4 rounded mb-4 text-sm font-medium text-center text-gray-700 grid grid-cols-3 gap-2">
      <!-- Seed phrase will appear here -->
    </div>
    <div class="flex justify-center">
      <button @click="generateSeedPhrase" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Generate Secret Recovery Phrase</button>
    </div>
    <div id="post-generate-options" class="hidden mt-4">
      <div class="flex items-center mb-4">
        <input id="saved-phrase-checkbox" type="checkbox" v-model="isPhraseSaved" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required>
        <label for="saved-phrase-checkbox" class="ml-2 text-gray-700">I saved my Secret Recovery Phrase</label>
      </div>
      <div class="flex justify-between">
        <button @click="copySeedPhrase" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Copy</button>
        <button @click="continueToWallet" :disabled="!isPhraseSaved" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" :class="{'cursor-not-allowed': !isPhraseSaved}">Continue</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const seedPhraseContainer = ref(null);
const isPhraseSaved = ref(false);

const generateSeedPhrase = async () => {
  try {
    const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/newAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      const words = responseData.wallet.seedPhrase.split(' ');
      seedPhraseContainer.value.innerHTML = words.map((word, index) => `
        <div class="flex items-center justify-start bg-gray-200 text-gray-800 py-1 px-2 rounded">
          <span class="mr-2">${index + 1}.</span>
          <span>${word}</span>
        </div>
      `).join('');

      document.querySelector("#post-generate-options").classList.remove("hidden");
      document.querySelector("#generate-btn").classList.add("hidden");

      document.querySelector("#saved-phrase-checkbox").addEventListener("change", () => {
        isPhraseSaved.value = !isPhraseSaved.value;
      });

    } else {
      alert("Failed to create wallet. Please try again.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred. Please try again later.");
  }
};

const copySeedPhrase = async () => {
  try {
    const seedPhrase = document.querySelector("#seed-phrase-container").innerText;
    await navigator.clipboard.writeText(seedPhrase);
    alert("Seed phrase copied to clipboard.");
  } catch (err) {
    alert("Failed to copy seed phrase.");
    console.error('Error:', err);
  }
};

const continueToWallet = () => {
  window.location.href = "/wallet";
};
</script>
