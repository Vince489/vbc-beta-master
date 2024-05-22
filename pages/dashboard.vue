<template>
  <div class="pt-20 flex justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <nuxt-icon name="heroicon-s-user" class="h-12 w-12 text-blue-500 mx-auto" />
      <h1 class="text-xl font-bold text-gray-800 text-center mt-4">Hello, {{ user.userName }}!</h1>
      <div class="mt-4">
        <p class="text-gray-600"><span class="font-bold">Email:</span> {{ user.email }}</p>
        <p class="text-gray-600"><span class="font-bold">Code Name:</span> {{ user.codeName }}</p>
        <p class="text-gray-600"><span class="font-bold">Roles:</span> {{ user.roles.join(', ') }}</p>
        <p class="text-gray-600"><span class="font-bold">Verified:</span> {{ user.verified ? 'Yes' : 'No' }}</p>
        <p class="text-gray-600"><span class="font-bold">Created At:</span> {{ new Date(user.createdAt).toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'; 

// Fetch user data from the auth store
const authStore = useAuthStore();
const user = authStore.currentUser;
</script>
