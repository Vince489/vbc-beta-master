<template>
  <div class="flex flex-col-reverse space-y-4 space-y-reverse p-4 bg-gray-900 text-white flex-grow">
    <div v-for="(message, index) in messages" :key="index" class="flex">
      <div
        :class="message.isUser ? 'bg-blue-600 ml-auto' : 'bg-gray-700 mr-auto'"
        class="p-2 rounded-lg max-w-xs"
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = [
  { text: 'Hello!', isUser: false },
  { text: 'Hi there!', isUser: true },
]
</script>
