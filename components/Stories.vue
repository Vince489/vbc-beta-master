<template>
  <div class="flex space-x-4 overflow-x-auto pb-4">
    <div v-for="story in stories" :key="story.id" class="flex-shrink-0">
      <div class="relative w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700">
        <img :src="story.avatar" alt="Avatar" class="rounded-full w-full h-full object-cover" />
        <div v-if="story.isNew" class="absolute inset-0 border-2 border-blue-500 rounded-full"></div>
      </div>
      <p class="text-center text-xs mt-2 text-gray-200 dark:text-gray-200">{{ story.name }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  stories: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
/* Custom styles can be added here if necessary */
</style>