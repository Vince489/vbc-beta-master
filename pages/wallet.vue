<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <!-- Use a conditional rendering to show loading text while gamer data is null -->
    <template v-if="!gamer">
      <p class="text-center">Loading...</p>
    </template>
    <!-- Once gamer data is available, display user's information -->
    <template v-else>
      <div>
        <p class="text-lg text-gray-300 font-bold">{{ (gamer.account.vrtAccount.balance /100).toFixed(2) }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const gamer = ref(null);

// Watch for changes in the authStore's gamer data
watchEffect(() => {
  gamer.value = authStore.currentGamer;
});
</script>

<style scoped>
/* Styles remain the same */
</style>
