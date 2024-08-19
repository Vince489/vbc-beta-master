<template>
  <div class="flex justify-center items-center my-6 text-gray-200">
    <div class="w-full max-w-md p-8 rounded">
      <h1 class="text-4xl font-semi-bold text-center text-gray-200 mb-6">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p class="text-red-500 text-xs italic">{{ emailError }}</p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p class="text-red-500 text-xs italic">{{ passwordError }}</p>
          <div>
            <nuxt-link to="/forgotPassword" class="py-2 block text-right align-baseline font-semi-bold text-sm text-blue-500 hover:text-blue-800">Forgot password?</nuxt-link>
          </div>
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Log In
          </button>
        </div>
        <p class="text-red-500 text-xs italic text-center mt-4">{{ generalError }}</p>
        
        <div class="text-center mt-6">
          <div class="flex items-center">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="px-3 text-gray-400 text-sm">Or Log In with</span>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
        </div>
      </form>

      <div class="flex justify-center mt-6">
        <button class="w-full bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1 flex items-center justify-center">
          <Icon name="ic:baseline-facebook" size="20px" class="mr-1 text-blue-500" />
          Facebook
        </button>
        <button class="w-full bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1 flex items-center justify-center">
          <img src="/img/google.png" alt="Google" class="mr-1 h-4 w-4" />
          Google
        </button>
      </div>      

      <div class="text-center mt-6">
        <p class="text-gray-400 text-sm">
          Don't have an account?
          <nuxt-link to="/signup" class="text-blue-500 hover:underline">Sign up</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore.js';
import { ref } from 'vue';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const generalError = ref('');

const validateFields = () => {
  emailError.value = '';
  passwordError.value = '';
  generalError.value = ''; 

  let isValid = true;

  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  }
  
  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateFields()) {
    return; // Stop execution if validation fails
  }

  try {
    const response = await authStore.$login(email.value, password.value);
    // Assuming response directly contains success and message
    if (!response.success) {
      // Handle login failure using the message from the response
      generalError.value = 'Error: ' + response.message;
    }
  } catch (error) {
    // Handle unexpected errors
    generalError.value = 'Unexpected error: ' + (error.message || 'Please try again later.');
  }
};

</script>