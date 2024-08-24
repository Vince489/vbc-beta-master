<template>
  <div class="rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
    <div v-for="chat in chats" :key="chat.id" class="flex items-center p-4">
      <div class="relative">
        <img :src="chat.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
        <span v-if="chat.isOnline" class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
      </div>
      <div class="ml-4 flex-1">
        <div class="flex justify-between">
          <p class="font-medium">{{ chat.name }}</p>
          <span class="text-xs text-gray-300">{{ chat.timestamp }}</span>
        </div>
        <p class="text-sm text-gray-400">
          <span v-if="chat.isTyping" class="italic text-blue-500">Typing...</span>
          <span v-else>{{ chat.message }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  chats: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
/* Custom styles can be added here if necessary */
</style>