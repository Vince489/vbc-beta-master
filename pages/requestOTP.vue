<template>
  <div class="flex justify-center items-center my-6 text-gray-200">
    <div class="w-full max-w-md p-8 rounded bg-gray-800">
      <p class="text-gray-300 mb-4">
        Request a new One-Time Password (OTP) to be sent to your email address.
      </p>
      <h1 class="text-4xl font-semi-bold text-center text-gray-200 mb-6">Resend OTP</h1>

      <form @submit.prevent="handleResend">
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
        <div class="flex justify-center">
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Resend OTP
          </button>
        </div>
        <p class="text-red-500 text-xs italic text-center mt-4">{{ generalError }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app';

const email = ref('');
const emailError = ref('');
const generalError = ref('');

const handleResend = async () => {
  // Reset errors
  emailError.value = '';
  generalError.value = '';

  // Validate email field
  if (!email.value) {
    emailError.value = 'Please enter your email.';
    return;
  }

  try {
    // Perform resend OTP request
    const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/email_verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      })
    });

    // Check if the response is OK
    if (!response.ok) {
      // Attempt to parse the response as JSON
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        // Throw error with server-provided message
        throw new Error(errorData.message || 'Failed to resend OTP');
      } catch (jsonError) {
        // Use plain text if JSON parsing fails
        throw new Error(errorText || 'Failed to resend OTP');
      }
    }

    // If response is OK, navigate to the verification page
    console.log('Resend OTP successful');
    navigateTo('/verify'); // Redirect to verification page after successful resend
  } catch (error) {
    console.log(error.message);
    generalError.value = error.message || 'Failed to resend OTP. Please try again.';
  }
};
</script>


<style scoped>
  /* Add scoped styles as needed */
</style>
