<template>
  <div>
    <div class="container mx-auto py-6 px-4 mt-2">
      <h1 class="text-2xl font-bold mt-2 mb-10 text-center">Register New Manager</h1>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-4">
          <!-- First Name Field -->
          <div class="col-span-1">
            <label for="firstNameInput" class="block text-sm font-medium text-white">First Name</label>
            <input
              id="firstNameInput"
              type="text"
              placeholder="First Name"
              v-model="firstName"
              class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <!-- Last Name Field -->
          <div class="col-span-1">
            <label for="lastNameInput" class="block text-sm font-medium text-white">Last Name</label>
            <input
              id="lastNameInput"
              type="text"
              placeholder="Last Name"
              v-model="lastName"
              class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Register Manager
          </button>
        </div>
      </form>

      <!-- Error and Success Messages -->
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/authStore';

// Form fields
const firstName = ref('');
const lastName = ref('');
const errorMessage = ref('');
const successMessage = ref('');

// Auth store
const authStore = useAuthStore();

// Handle form submission
async function handleSubmit() {
    // Clear previous messages
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const result = await authStore.registerManager({ firstName: firstName.value, lastName: lastName.value });

        if (result.success) {
            successMessage.value = 'Manager registered successfully!';
        } else {
            errorMessage.value = result.message || 'An error occurred while registering the manager.';
        }
    } catch (error) {
        errorMessage.value = error.message || 'An unexpected error occurred.';
    }
}
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
