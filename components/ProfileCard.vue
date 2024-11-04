<template>
  <div class="flex flex-col items-center justify-center h-screen bg-green-200">
    <div class="flex flex-col items-center w-full h-full max-w-md p-6 bg-green-200 text-center">
      <div class="rounded-full overflow-hidden w-64 h-64 mb-4 bg-white">
        <img src="/img/blank2.png" alt="Profile Image" class="w-full h-full object-cover" />
      </div>
      <h2 class="text-xl font-bold text-gray-800">Vincent Monroe Cornelius II</h2>
      <p class="text-gray-600">CEO – Planet Virtron LLC</p>
      <p class="text-sm text-gray-500 mt-2 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fuga perspiciatis ab ut suscipit saepe minima id.</p>

      <div class="flex justify-center gap-4 mb-6">
        <button class="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
          <Icon class="text-gray-400" size="24" name="majesticons:phone" />
        </button>
        <button class="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
          <Icon class="text-gray-400" size="24" name="majesticons:mail-line" />
        </button>
        <button class="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
          <Icon class="text-gray-400" size="24" name="il:instagram" />
        </button>
      </div>

      <!-- Use PhoneCard components with gap between them -->
      <div class="flex flex-col gap-4 w-full mb-4">
        <PhoneCard label="Mobile Phone (Work)" />
        <PhoneCard label="Phone" />
      </div>

      <button class="w-full py-2 bg-green-300 rounded-lg text-white font-semibold">
        Save to contacts
      </button>
    </div>
  </div>
</template>

<script setup>
import PhoneCard from '~/components/PhoneCard.vue';
// Import the Icon component from your icon library
// Example: import { Icon } from 'vue-icon-library';
</script>

<style scoped>
/* Set html and body to full height to avoid any extra space */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
