<!-- components/PhoneCard.vue -->
<template>
  <div class="bg-gray-100 p-4 rounded-lg w-full flex items-center justify-between">
    <Icon class="text-gray-400" size="20" name="majesticons:phone" />
    <p class="text-gray-600 text-sm">{{ label }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>
