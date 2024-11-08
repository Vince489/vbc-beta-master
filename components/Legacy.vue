<template>
  <div class="flex flex-col p-6 bg-gray-900 text-white max-w-md font-sans">
    <!-- Title and Legacy Mode Header -->
    <div class="flex justify-between items-center border-b border-gray-700 pb-3 mb-6">
      <h2 class="text-xl font-semibold">LEGACY MODE</h2>
      <div class="flex space-x-4 text-gray-400 text-sm">
        <span>LEGACY GOALS</span>
        <span>GREATEST OF ALL TIME</span>
      </div>
    </div>

    <!-- Requirements Section -->
    <div class="mb-6">
      <p class="text-sm mb-2">
        In order to maintain the status of the
        <strong>{{ currentStatus }}</strong>
        you must satisfy the following:
      </p>
      <ul class="space-y-2">
        <li v-for="requirement in requirements" :key="requirement.text" class="flex items-center space-x-2">
          <input
            type="checkbox"
            :checked="requirement.met"
            disabled
            class="form-checkbox text-yellow-500 bg-gray-800 border-gray-600"
          />
          <span :class="{ 'text-gray-400': !requirement.met }">{{ requirement.text }}</span>
        </li>
      </ul>
    </div>

    <!-- Legacy Rating Section -->
    <div class="border border-gray-700 rounded-lg">
      <ul class="divide-y divide-gray-700">
        <li
          v-for="(status, index) in legacyStatuses"
          :key="status"
          :class="{
            'bg-yellow-500 text-black': index === currentStatusIndex,
            'bg-gray-800 text-gray-300': index !== currentStatusIndex
          }"
          class="px-4 py-2 text-center text-sm font-medium"
        >
          {{ status }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStatus: "GREATEST OF ALL TIME",
      currentStatusIndex: 0, // Adjust based on current status
      legacyStatuses: [
        "Greatest Of All Time",
        "Ring Legend",
        "Hall of Famer",
        "Superstar",
        "Champion",
        "Contender",
        "Club Fighter",
        "Prospect",
        "Amateur"
      ],
      requirements: [
        { text: "Win % is greater than or equal to 90", met: true },
        { text: "Popularity is greater than 95%", met: true },
        { text: "Number of Fights exceeds 50", met: true },
        { text: "P4P Rank exceeds 5", met: false },
        { text: "Defend titles 8 time(s)", met: false },
        { text: "Hold at least 3 belt(s)", met: false }
      ]
    };
  }
};
</script>

<style scoped>
/* Scoped styles can go here if you need additional customizations. */
</style>
