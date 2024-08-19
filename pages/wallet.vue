<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <h1>Wallet</h1>
    <div v-if="gamer && gamer.account && gamer.account.vrtAccount">
      <h2>Balance: {{ gamer.account.vrtAccount.balance }}</h2>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/authStore.js';

const authStore = useAuthStore();
const gamer = ref(null);

onMounted(() => {
  gamer.value = authStore.currentGamer;
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>