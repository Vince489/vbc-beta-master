<template>
  <div class="container-xl px-3 px-md-4 px-lg-5 mt-2">
    <!-- Use a conditional rendering to show loading text while userData is null -->
    <template v-if="!userData">
      <p>Loading...</p>
    </template>
    <!-- Once userData is available, display user's information -->
    <template v-else>
      <div class="cursor-pointer hover:cursor-pointer">
        <img class="rounded-lg" src="/assets/img/free.png" alt="free tokens">
      </div>
      <div class="pt-10 flex user-info">
        <!-- User's image as a circular icon -->
        <div class=" user-avatar">
          <!-- Replace 'userImg' with the appropriate property from your userData -->
          <img :src="userData.image" alt="User Avatar" class="avatar-img border border-gray-300">
        </div>
        <!-- User's name -->
        <div class="user-name">
          <!-- Replace 'userName' with the appropriate property from your userData -->
          <p class="text-2xl font-semibold">{{ userData.userName }}</p>
          <div class="pt-2">
            <select v-model="selectedGamerTag" class="mt-1 block w-full rounded-md border border-slate-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-transparent">
            <option disabled value="">Select Gamer Tag</option>
            <option v-for="gamerTag in userData.gamerTags" :key="gamerTag.id" :value="gamerTag.id">{{ gamerTag.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="pt-8">
        <!-- Additional content for the dashboard page -->
        <button class="w-full bg-slate-600 text-sm text-slate-300 py-2 px-4 rounded">
          Add Gamertag
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Dashboard',
  description: 'User dashboard page'
});
import {useAuthStore} from "~/stores/authStore.js";
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

definePageMeta({
  middleware: 'auth',
  title: 'Dashboard',
  description: 'User dashboard page'
});

// Get the user's information from the store
const authStore = useAuthStore()
const userData = ref(null); // Use a ref to make it reactive

// Get router instance
const router = useRouter();

onMounted(() => {
  userData.value = authStore.currentUser
});
</script>

<style scoped>
/* Styles for user avatar */
.user-avatar {
  margin-right: 10px; /* Adjust margin as needed */
}

.avatar-img {
  width: 64px; /* Adjust size as needed */
  height: 64px; /* Adjust size as needed */
  border-radius: 50%; /* Create a circular shape */
}

/* Styles for user name */
.user-name {
  /* Add styles for user name div */
}

/* Additional styles as needed */
</style>
