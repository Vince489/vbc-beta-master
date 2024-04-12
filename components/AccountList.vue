<template>
  <div>
    <h2>Account List</h2>
    <button @click="fetchAccounts">Fetch Accounts</button>
    <div v-if="accounts.length">
      <h3>Accounts:</h3>
      <ul>
        <li v-for="account in accounts" :key="account._id">
          {{ account }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    async fetchAccounts() {
      try {
        const response = await fetch('https://gaming-token-production.up.railway.app/api/v1/user/account', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          this.accounts = data;
        } else {
          console.error('Error fetching accounts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    },
  },
};
</script>
