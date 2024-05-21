<template>
  <div :class="cardClasses">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  class: String
});

const cardClasses = `rounded-lg shadow-lg p-4 ${props.class}`;
</script>