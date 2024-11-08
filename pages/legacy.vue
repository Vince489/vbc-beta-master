<template>
  <div class="flex flex-col p-8 bg-gray-800 text-white w-full max-w-5xl mx-auto font-sans">
    <!-- Header -->
    <div class="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
      <h2 class="text-xl font-semibold">LEGACY MODE</h2>
    </div>

    <!-- Current Status -->
     <div>
      <p class="text-base mb-4">
        Your current rating is:
        <strong class="text-yellow-500">Amateur</strong>
      </p>
     </div>

    <!-- Dashes as Ratings Selection -->
    <div class="flex flex-col items-center mb-8">
      <span class="text-lg font-semibold">{{ legacyStatuses[selectedIndex] }}</span>
      <div class="flex items-center mt-2 space-x-1">
        <!-- Display dashes in the same order as legacyStatuses -->
        <span
          v-for="(status, index) in legacyStatuses"
          :key="index"
          :class="{
            'h-2 w-6 bg-yellow-500': index === selectedIndex, // Highlight selected dash
            'h-2 w-6 bg-gray-500': index !== selectedIndex // Normal dashes
          }"
          @click="selectStatus(index)"
          class="cursor-pointer rounded-sm border border-gray-600"
        ></span>
      </div>
    </div>

    <!-- Content: Requirements Section -->
    <div>
      <p class="text-base mb-4">
        In order to achieve the status of
        <strong class="text-yellow-500">{{ legacyStatuses[selectedIndex] }}</strong>,
        you must satisfy the following:
      </p>
      <ul class="space-y-3">
        <li
          v-for="requirement in requirementsList[legacyStatuses[selectedIndex]]"
          :key="requirement.text"
          class="flex items-center space-x-3"
        >
          <input
            type="checkbox"
            :checked="requirement.met"
            disabled
            class="form-checkbox text-yellow-500 bg-gray-700 border-gray-600 rounded"
          />
          <span :class="{ 'text-gray-400': !requirement.met }" class="text-lg">{{ requirement.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0, // "Amateur" will be selected initially (index 0)
      legacyStatuses: [
        "Professional", 
        "Prospect", 
        "Club Fighter", 
        "Contender", 
        "Champion", 
        "Superstar", 
        "Hall of Famer", 
        "Ring Legend", 
        "Greatest Of All Time" // Last item (rightmost dash)
      ],
      requirementsList: {
        "Professional": [
          { text: "Has streamed a minimum of 1 Fight", met: false }
        ],
        "Prospect": [
          { text: "Win % is greater than or equal to 51", met: false },
          { text: "Rank exceeds 45", met: false },
          { text: "Has streamed a minimum of 3 Fights", met: false }
        ],
        "Club Fighter": [
          { text: "Win % is greater than or equal to 60", met: false },
          { text: "Popularity is greater than 20%", met: false },
          { text: "Number of streamed Fights exceeds 4", met: false },
          { text: "Rank exceeds 40", met: false },
          { text: "Win a VBC Wednesday Night Fight (Eligible after 5th Fight)", met: false }
        ],
        "Contender": [
          { text: "Win % is greater than or equal to 70", met: false },
          { text: "Popularity is greater than 45%", met: false },
          { text: "Number of streamed Fights exceed 15", met: false },
          { text: "Rank exceeds 30", met: false },
          { text: "Win a VBC Friday Night Fight (Eligible after 11th Fight)", met: false }
        ],
        "Champion": [
          { text: "Hold at least 1 belt (Eligible after 19th Fight)", met: false }
        ],
        "Superstar": [
          { text: "Win % is greater than or equal to 80", met: false },
          { text: "Popularity is greater than 75%", met: false },
          { text: "Number of streamed Fights exceed 30", met: false },
          { text: "Defend titles 3 times", met: false },
          { text: "Hold at least 1 belt", met: false }
        ],
        "Hall of Famer": [
          { text: "Win % is greater than or equal to 82", met: false },
          { text: "Popularity is greater than 85%", met: false },
          { text: "Number of streamed Fights exceed 40", met: false },
          { text: "Defend titles 4 times", met: false },
          { text: "Hold at least 2 belts", met: false }
        ],
        "Ring Legend": [
          { text: "Win % is greater than or equal to 85", met: false },
          { text: "Popularity is greater than 90%", met: false },
          { text: "Number of streamed Fights exceed 45", met: false },
          { text: "Defend titles 5 times", met: false },
          { text: "Hold at least 3 belts", met: false }
        ],
        "Greatest Of All Time": [
          { text: "Win % is greater than or equal to 90", met: false },
          { text: "Popularity is greater than 95%", met: false },
          { text: "Number of streamed Fights exceed 50", met: false },
          { text: "Defend titles 8 times", met: false },
          { text: "Hold at least 3 belts", met: false }
        ]
      }
    };
  },
  methods: {
    selectStatus(index) {
      // Update the selected index when a dash is clicked
      this.selectedIndex = index;
    }
  }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
