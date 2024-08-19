// stores/walletStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from './authStore'; // Adjust the path as necessary

export const useWalletStore = defineStore('walletStore', () => {
  const authStore = useAuthStore(); // Initialize authStore
  const seedPhraseWords = ref([]);
  const isPhraseSaved = ref(false);
  const isGenerated = ref(false); // New state to track if the seed phrase is generated

  const generateSeedPhrase = async () => {
    try {
      const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/newAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`, // Use auth token if needed
        },
      });
      const responseData = await response.json();
      const { seedPhrase, gamer } = responseData;
      if (seedPhrase) {
        seedPhraseWords.value = seedPhrase.split(' ');
        isGenerated.value = true; // Update the state when the seed phrase is generated
        authStore.currentGamer = gamer; // Update the currentGamer in authStore
      } else {
        console.error('Seed phrase is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copySeedPhrase = async () => {
    try {
      const seedPhrase = seedPhraseWords.value.join(' ');
      await navigator.clipboard.writeText(seedPhrase);
      alert("Seed phrase copied to clipboard.");
    } catch (err) {
      alert("Failed to copy seed phrase.");
      console.error('Error:', err);
    }
  };

  const updateFighterAccount = async (newAccountData) => {
    try {
      const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/fighter/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`, // Use auth token if needed
        },
        body: JSON.stringify(newAccountData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Extract the error message from the response
        const errorMessage = data.message || 'An error occurred while updating the fighter account.';
        throw new Error(errorMessage);
      }

      // Update local store with the updated fighter account
      const index = authStore.fighters.findIndex(fighter => fighter.id === data.fighter.id);
      if (index !== -1) {
        authStore.fighters[index] = data.fighter;
      } else {
        authStore.fighters.push(data.fighter);
      }
      authStore.currentGamer.fighters = authStore.fighters;

      return { success: true, message: 'Fighter account updated successfully!' };
    } catch (error) {
      console.error('Update error:', error.message);
      return { success: false, message: error.message };
    }
  };

  return { seedPhraseWords, isPhraseSaved, isGenerated, generateSeedPhrase, copySeedPhrase, updateFighterAccount };
});