<template>
  <div class="pt-12 min-h-screen p-4">
    <div class="max-w-md mx-auto space-y-4">
      <!-- Timestamp -->
      <p class="text-center text-gray-300 dark:text-gray-400 text-xs">Today 12:15 AM</p>
      
      <!-- Message 1 -->
      <div class="flex items-start space-x-2">
        <div class="flex-1">
          <div class="bg-gray-500 rounded-lg p-2">
            <p class="text-green-500 font-medium">Asther</p>
            <p class="">
              Let's go on a vacation, I have exciting vacation plans! 😎
            </p>
          </div>
          <p class="text-xs text-gray-300 mt-2">12:30 AM</p>
        </div>
      </div>

      <!-- Reaction -->
      <div class="pl-10">
        <p class="text-red-500 text-sm">❤️</p>
      </div>

      <!-- Message 2 (Sent by User) -->
      <div class="flex justify-end items-start space-x-2">
        <div class="flex-1 max-w-xs">
          <div class="bg-blue-500 text-white rounded-lg p-2">
            <p>Let's go, but what's the plan?</p>
          </div>
          <p class="text-xs text-right text-gray-300 mt-2">12:30 AM</p>
        </div>
      </div>

      <!-- Image Message -->
      <div class="flex items-start space-x-2">
        <div class="flex-1">
          <div class="bg-gray-500 dark:bg-gray-700 rounded-lg p-2">
            <div class="mb-2">
              <p class="pb-2 text-green-500 font-medium">Asther</p>
              <div class="rounded-lg overflow-hidden">
                <img src="https://via.placeholder.com/300" alt="Shared Image" class="rounded-lg object-cover w-full h-40" />
              </div>
              <p class="mt-2">I have vacation plan in Ladakh for next week.</p>
            </div>
          </div>
          <p class="text-xs text-gray-300 dark:text-gray-400 mt-2">12:31 AM</p>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div class="flex items-start space-x-2">
        <img :src="placeholderUrl" alt="Other User Avatar" class="w-8 h-8 rounded-full object-cover" />
        <div class="flex-1">
          <div class="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 flex items-center space-x-1">
            <span class="block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
            <span class="block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
            <span class="block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <!-- <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg">
        <div class="flex items-center space-x-2">
          <button class="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-8.464 8.464L4.928 13.07m9.732-7.536a2.828 2.828 0 113.997 4.004L12 16.5H9v-3l8.294-8.294z" />
            </svg>
          </button>
          <button class="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </button>
          <input type="text" placeholder="Type here..." class="flex-1 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring focus:ring-green-500 text-gray-900 dark:text-gray-100" />
          <button class="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m0-4h.01M12 18v2m6 4h-4v-6h-2v6H6v-8H2l10-10 10 10h-4v8z" />
            </svg>
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const placeholderUrl = 'https://via.placeholder.com/150';
</script>

<style scoped>
/* Custom styles can be added here if necessary */
</style>
