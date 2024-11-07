<template>
  <div class="flex justify-center items-center my-6 text-gray-200">
    <div class="w-full max-w-md p-8 rounded bg-gray-800">
      <p class="text-gray-300 mb-4">
        A One-Time Password (OTP) has been sent to your email address. Please check your email and enter the OTP below to complete your registration.
      </p>
      <h1 class="text-4xl font-semi-bold text-center text-gray-200 mb-6">Verify Email</h1>

      <form @submit.prevent="handleSubmit">
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
          <label for="otp" class="block text-gray-300 text-sm font-bold mb-2">OTP</label>
          <input
            type="text"
            id="otp"
            v-model="otp"
            placeholder="Enter OTP"
            class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <!-- Conditional rendering for error message -->
          <p v-if="otpError" class="text-red-500 text-xs italic">{{ otpError }}</p>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="isLoading">
            Submit
          </button>
        </div>
        <p class="text-red-500 text-xs italic text-center mt-4">{{ generalError }}</p>
      </form>
      <div class="text-center mt-6">
        <p class="text-gray-400 text-sm">
          Didn't receive the email? Check your spam/junk folder or
          <button class="text-blue-500 hover:underline" @click="resendOTP" :disabled="isLoading">Resend OTP</button>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app';

const email = ref('');
const otp = ref('');
const emailError = ref('');
const otpError = ref('');
const generalError = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  // Reset errors
  emailError.value = '';
  otpError.value = '';
  generalError.value = '';

  // Validate email and OTP fields
  if (!email.value) {
    emailError.value = 'Please enter your email.';
    return; // Prevent form submission
  }

  if (!otp.value) {
    otpError.value = 'Please enter the OTP.';
    return; // Prevent form submission
  }

  try {
    // Perform OTP verification
    const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/email_verification/verify', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        otp: otp.value
      })
    });

    if (!response.ok) {
      // Handle non-JSON error response
      const errorText = await response.text();
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();

    // Check if OTP verification was successful
    // Modify this check based on the actual response structure
    if (responseData.verified !== true) {
      throw new Error(responseData.message || 'Failed to verify OTP');
    }

    console.log('OTP verified successfully');

    // Clear the inputs
    email.value = '';
    otp.value = '';

    navigateTo('/login');
  } catch (error) {
    console.error('Form submission error:', error.message);
    generalError.value = 'Unexpected error: ' + (error.message || 'Please try again later.');
  }
};


// Handle redirection to /requestOTP
const resendOTP = () => {
  navigateTo('/requestOTP');
};
</script>

<style scoped>
  /* Add scoped styles as needed */
</style>
