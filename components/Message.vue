<template>
  <div :class="['flex mb-4', { 'justify-end': isUser }]">
    <div :class="['max-w-xs px-4 py-2 rounded-lg', isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900']">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  isUser: Boolean,
})
</script>
