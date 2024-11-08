<template>
  <div class="border border-gray-700 rounded-lg overflow-hidden">
    <ul>
      <li
        v-for="(status, index) in legacyStatuses"
        :key="status"
        :class="{
          'bg-yellow-500 text-black font-semibold': index === achievedStatusIndex, // Highlight current rating
          'bg-gray-800 text-gray-300': index !== achievedStatusIndex // Normal status
        }"
        class="px-6 py-3 text-center text-lg cursor-pointer"
        @click="selectRating(index)"
      >
        {{ status }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    legacyStatuses: {
      type: Array,
      required: true
    },
    achievedStatusIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    selectRating(index) {
      // Emit selected index to the parent component
      this.$emit('update:achievedStatusIndex', index);
    }
  }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
