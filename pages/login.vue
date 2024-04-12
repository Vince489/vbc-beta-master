<template>
  <div class="flex justify-center items-center mt-32">
    <div class="w-full max-w-sm">
      <div>
        <h1 class="pb-6 text-4xl">Login</h1>
      </div>
      <form @submit.prevent="handleLogin" class="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
          <p class="hidden text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex justify-center">
          <button class="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore.js";
import { ref } from 'vue';
import { navigateTo } from "#app";

const authStore = useAuthStore()

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const generalError = ref('');

const handleLogin = async () => {
  // Reset errors
  emailError.value = '';
  passwordError.value = '';
  generalError.value = '';

  try {
    // Perform login
    const response = await authStore.$login(email.value, password.value);
    // Check if the login attempt was successful
    if (response?.user?.isAuthenticated) {
      return navigateTo("/dashboard")
    }
  } catch (error) {
    // Handle login error
    generalError.value = 'Error logging in: ' + error.message;
  }
};
</script>
