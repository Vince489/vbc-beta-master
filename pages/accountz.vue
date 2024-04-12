<template>
  <div class="p-4">
    <div class="mb-4">
      <h2 class="text-2xl font-semibold">{{ isAccountCreated ? 'Created Account Details' : 'Create Account' }}</h2>
    </div>

    <div class="mb-8">
      <div class="mb-4">
        <h3 class="text-lg font-semibold">Seed Phrase</h3>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <!-- Display seed phrase in 3 rows of 4 words each -->
        <div v-for="(word, index) in seedPhraseArray" :key="index" class="p-2 border rounded">
          {{ word }}
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-lg font-semibold">Public Key</h3>
      <div class="bg-gray-100 p-2 rounded">
        {{ publicKey }}
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold">Private Key</h3>
      <div class="bg-gray-100 p-2 rounded">
        {{ privateKey }}
      </div>
    </div>
  </div>

  <!-- Disable the button if isAccountCreated is true -->
  <button @click="createNewAccount" :disabled="isAccountCreated" class="bg-blue-500 text-white p-2 rounded cursor-pointer">Create New Account</button>
  
  <button @click="addAccount" class="bg-red-400 text-white p-2 rounded cursor-pointer m-6">Add Account to Gamer</button>
</template>

<script>
// definePageMeta({
//   middleware: 'auth', // Reference the 'auth' middleware
// });

export default {
  data() {
    return {
      isAccountCreated: false, // Flag to track if the account is created
      seedPhraseArray: [], // You need to populate this with your seed phrase words
      publicKey: '', // Populate this with your public key from the endpoint
      privateKey: '', // Populate this with your private key from the endpoint
    };
  },
  methods: {
    async createNewAccount() {
      try {
        const response = await fetch('https://test-virtue-production.up.railway.app/api/v1/account/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to create a new account');
        }

        const data = await response.json();

        // Check if the response has the expected structure
        if (data && Array.isArray(data.seedPhrase) && data.seedPhrase.length === 1) {
          // Access the seed phrase as an array with a single string element
          const seedPhraseString = data.seedPhrase[0];

          // Handle the response data here and update your component's data properties.
          this.seedPhraseArray = seedPhraseString.split(' ');
          this.publicKey = data.account.publicKey;
          this.privateKey = data.account.privateKey;

          // Set the flag to indicate that the account is created
          this.isAccountCreated = true;
          console.log(this.isAccountCreated);

          // Add accountId to sessionStorage
          const accountId = data.account._id; // Assuming that accountId is present in the response
          sessionStorage.setItem('accountId', accountId);

          // Now, accountId is stored in sessionStorage and can be accessed later
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        console.error('Error creating a new account:', error);
        // Handle the error as needed (e.g., show an error message).
      }
    },

    

async addAccount() {
  try {
    // Fetch the accountId from sessionStorage
    const accountId = sessionStorage.getItem('accountId');

    if (!accountId) {
      // Handle the case where accountId is not available in sessionStorage
      console.error('No accountId found in sessionStorage.');
      return;
    }

    // Retrieve the gamerTag from sessionStorage
    const authenticatedGamer = JSON.parse(sessionStorage.getItem('authenticatedGamer'));

    const gamerTag = authenticatedGamer.gamerTag;

    if (!gamerTag) {
      console.error('No gamerTag found in sessionStorage.');
      return;
    }

    // Send a POST request to your API to associate the account with the gamer
    const response = await fetch('https://test-virtue-production.up.railway.app/api/v1/gamer/add-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gamerTag: gamerTag, // Use the retrieved gamerTag
        accountId: accountId,
      }),
      mode: 'cors',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Failed to associate the account with the gamer');
    }

    // Handle success, update your component as needed
    // For example, you can reset the isAccountCreated flag and clear the accountId from sessionStorage
    this.isAccountCreated = false;
    sessionStorage.removeItem('accountId');
    console.log('Account associated with gamer successfully');
  } catch (error) {
    console.error('Error associating account with gamer:', error);
    // Handle the error as needed (e.g., show an error message).
  }
}
  },
};
</script>
