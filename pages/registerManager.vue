<template>
  <div>
    <div class="container mx-auto py-6 px-4 mt-2">
      <h1 class="text-2xl font-bold mt-2 mb-10 text-center">Register New Manager</h1>
      <form @submit.prevent="registerManager">
        <div class="grid grid-cols-2 gap-4">
          <!-- First Name Field -->
          <div class="col-span-1">
            <FormField v-slot="{ field }" name="firstName" class="mb-4">
              <FormItem>
                <FormLabel class="block text-sm font-medium text-white">First Name</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="First Name"
                    v-model="firstName"
                    class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          
          <!-- Last Name Field -->
          <div class="col-span-1">
            <FormField v-slot="{ field }" name="lastName" class="mb-4">
              <FormItem>
                <FormLabel class="block text-sm font-medium text-white">Last Name</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Last Name"
                    v-model="lastName"
                    class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
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

// Function to register a manager
const registerManager = async () => {
  const newManagerData = {
    firstName: firstName.value,
    lastName: lastName.value
  };

  try {
    const success = await authStore.registerManager(newManagerData);
    if (success) {
      successMessage.value = 'Manager registered successfully!';
      errorMessage.value = '';
      // Redirect to the dashboard (you may need to adjust this based on your routing)
      setTimeout(() => {
        window.location.href = '/dashboard'; // Adjust the path as needed
      }, 1000); // Optional delay for user feedback
    } else {
      errorMessage.value = 'An error occurred while registering the manager.';
      successMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = '';
  }
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
