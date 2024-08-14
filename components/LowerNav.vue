<template>
  <div v-if="authStore.currentGamer" class="fixed bottom-0 left-0 w-full bg-gray-800 flex justify-around py-4">
    <nuxt-link to="/" class="text-white">
      <Icon name="mdi:home-outline" size="24px" />
    </nuxt-link>
    <nuxt-link to="/fighters" class="text-white">
      <Icon name="mdi:magnify" size="24px" />
    </nuxt-link>
    <nuxt-link to="/#fight" class="text-white">
      <Icon name="mdi:plus-circle-outline" size="30px" />
    </nuxt-link>
    <button @click="handleWalletClick" class="text-white">
      <Icon name="mdi:wallet-outline" size="24px" />
    </button>
    <nuxt-link to="/overview" class="text-white">
      <Icon name="mdi:account" size="24px" />
    </nuxt-link>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore.js";

const authStore = useAuthStore();

function handleWalletClick() {
  if (authStore.currentGamer && authStore.currentGamer.account) {
    // Redirect to the wallet page
    window.location.href = '/wallet';
  } else {
    // Show HTML alert
    alert('You do not have an account. Please create an account to access the wallet.');
    // Optionally, redirect to the account creation page
    window.location.href = '/create-account';
  }
}
</script>
