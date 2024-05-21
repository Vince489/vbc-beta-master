<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2 flex justify-center">
    <div>
      <!-- Use a conditional rendering to show loading text while userData is null -->
      <template v-if="!userData">
        <p>Loading...</p>
      </template>
      <!-- Once userData is available, display user's information -->
      <template v-else>
        <div class="pt-4 cursor-pointer hover:cursor-pointer">
          <p class="text-slate-300">hello</p>
        </div>

        <div>
          <!-- Additional user information can be added here -->
        </div>


      </template>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Dashboard',
  description: 'User dashboard page'
});

import { useAuthStore } from '~/stores/authStore.js';
import { onMounted, ref } from 'vue';

definePageMeta({
  middleware: 'auth',
  title: 'Dashboard',
  description: 'User dashboard page'
});

// Get the user's information from the store
const authStore = useAuthStore();
const userData = ref(null); // Use a ref to make it reactive

// Fetch the user's data when the component is mounted
onMounted(() => {
  userData.value = authStore.currentUser;
});

// Sample projects data (replace with data from your database)
const projects = ref([
  { id: 1, name: 'Project 1', description: 'Description of Project 1' },
  { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  // Add more project objects as needed
]);

// Function to handle cancel action
const cancelProject = (projectId) => {
  // Logic to cancel the project (e.g., remove from the database)
};

// Function to handle deploy action
const deployProject = (projectId) => {
  // Logic to deploy the project (e.g., trigger deployment process)
};
</script>

<style scoped>
</style>