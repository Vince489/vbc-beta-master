<template>
  <div class="flex justify-center items-center my-6 text-gray-200">
    <div class="w-full max-w-md p-8 rounded">
      <h1 class="text-4xl font-semi-bold text-center text-gray-200 mb-6">Forgot Password</h1>
      <form @submit.prevent="handlePasswordReset">
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
        <div v-if="showOTP">
          <div class="mb-4">
            <label for="otp" class="block text-gray-300 text-sm font-bold mb-2">OTP</label>
            <input
              type="text"
              id="otp"
              v-model="otp"
              placeholder="Enter the OTP sent to your email"
              class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p class="text-red-500 text-xs italic">{{ otpError }}</p>
          </div>
          <div class="mb-4">
            <label for="newPassword" class="block text-gray-300 text-sm font-bold mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              placeholder="Enter your new password"
              class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p class="text-red-500 text-xs italic">{{ newPasswordError }}</p>
          </div>
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {{ showOTP ? 'Reset Password' : 'Reset Password' }}
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
const otp = ref('');
const newPassword = ref('');
const emailError = ref('');
const otpError = ref('');
const newPasswordError = ref('');
const generalError = ref('');
const showOTP = ref(false);

const handlePasswordReset = async () => {
  // Reset errors
  emailError.value = '';
  otpError.value = '';
  newPasswordError.value = '';
  generalError.value = '';

  try {
    if (!showOTP.value) {
      // Send OTP
      const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      });

      const result = await response.json();

      if (response.ok) {
        showOTP.value = true;
      } else {
        generalError.value = result.error || 'Error sending OTP';
      }
    } else {
      // Reset Password
      const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/forgot_password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          otp: otp.value,
          newPassword: newPassword.value,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.passwordReset) {
          navigateTo('/login');
        } else {
          generalError.value = 'Error resetting password';
        }
      } else {
        if (result.error.includes('email')) {
          emailError.value = result.error;
        } else if (result.error.includes('code')) {
          otpError.value = result.error;
        } else if (result.error.includes('password')) {
          newPasswordError.value = result.error;
        } else {
          generalError.value = result.error;
        }
      }
    }
  } catch (error) {
    generalError.value = 'Error: ' + error.message;
  }
};
</script>
