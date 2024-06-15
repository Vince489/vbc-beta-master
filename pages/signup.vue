<template>
  <div class="flex justify-center items-center my-6 text-gray-200">
    <div class="w-full max-w-md p-8 rounded">
      <h1 class="text-4xl font-semi-bold text-center text-gray-200 mb-6">Sign Up</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="gamerTag" class="block text-gray-300 text-sm font-bold mb-2">Gamer Tag</label>
          <input
            type="text"
            id="gamerTag"
            v-model="gamerTag"
            placeholder="Enter your gamer tag"
            class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p class="text-red-500 text-xs italic">{{ gamerTagError }}</p>
        </div>
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
        </div>
        <div class="mb-4">
          <label for="verifyPassword" class="block text-gray-300 text-sm font-bold mb-2">Verify Password</label>
          <input
            type="password"
            id="verifyPassword"
            v-model="verifyPassword"
            placeholder="Verify your password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p class="pb-6 text-red-500 text-xs italic">{{ verifyPasswordError }}</p>
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </button>
        </div>
        <p class="text-red-500 text-xs italic text-center mt-4">{{ generalError }}</p>

        <div class="text-center mt-6">
          <div class="flex items-center">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="px-3 text-gray-400 text-sm">Or Sign Up with</span>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
          <div class="flex justify-center mt-6">
            <button class="w-full bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1 flex items-center justify-center">
              <Icon name="ic:baseline-facebook" size="20px" class="mr-1 text-blue-500" />
              Facebook
            </button>
            <button class="w-full bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1 flex items-center justify-center">
              <Icon name="mdi:google" size="20px" class="mr-1 text-blue-500" />
              Google
            </button>
          </div>
        </div>

        <div class="text-center mt-6">
          <p class="text-gray-400 text-sm">
            Need a new One Time Pin?
            <nuxt-link to="/#" class="text-blue-500 hover:underline">Request OTP</nuxt-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const verifyPassword = ref('');
const gamerTag = ref('');
const emailError = ref('');
const passwordError = ref('');
const verifyPasswordError = ref('');
const gamerTagError = ref('');
const generalError = ref('');

const handleSignup = async () => {
  // Reset errors
  emailError.value = '';
  passwordError.value = '';
  verifyPasswordError.value = '';
  gamerTagError.value = '';
  generalError.value = '';

  // Validation logic
  if (!gamerTag.value) {
    gamerTagError.value = 'Gamer tag is required.';
  }

  if (!email.value) {
    emailError.value = 'Email is required.';
  }

  if (!password.value) {
    passwordError.value = 'Password is required.';
  }

  if (password.value !== verifyPassword.value) {
    verifyPasswordError.value = 'Passwords do not match.';
  }

  // Perform signup logic if no errors
  if (!gamerTagError.value && !emailError.value && !passwordError.value && !verifyPasswordError.value) {
    try {
      const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/signup', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gamerTag: gamerTag.value,
          email: email.value,
          password: password.value,
        }),
      });

      const data = await response.json();
      console.log('new gamer', data); // Log the response from the API

      if (response.ok) {
        if (data.message === 'Gamer created successfully') {
          // Redirect only if the signup was successful
          router.push('/verify');
        }
      } else {
        if (data.message === 'Gamer already exists') {
          gamerTagError.value = 'User already exists. Please use a different gamer tag.';
        } else if (data.errors && data.errors.length > 0) {
          generalError.value = data.errors[0].msg; // Set the API error message
        } else {
          generalError.value = 'An unexpected error occurred. Please try again later.';
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      generalError.value = 'An error occurred while signing up. Please try again later.'; // Set a generic error message
    }
  }
};
</script>




