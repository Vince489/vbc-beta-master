<template>
  <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-bold mb-4">Create Bout</h2>

    <div class="mb-4">
      <label for="fighterA" class="block text-sm font-medium text-gray-700">Fighter A ID</label>
      <input type="text" v-model="boutData.fighterA" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterB" class="block text-sm font-medium text-gray-700">Fighter B ID</label>
      <input type="text" v-model="boutData.fighterB" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="winner" class="block text-sm font-medium text-gray-700">Winner ID</label>
      <input type="text" v-model="boutData.winner" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="loser" class="block text-sm font-medium text-gray-700">Loser ID</label>
      <input type="text" v-model="boutData.loser" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="method" class="block text-sm font-medium text-gray-700">Method</label>
      <input type="text" v-model="boutData.method" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="roundEnded" class="block text-sm font-medium text-gray-700">Round Ended</label>
      <input type="number" v-model="boutData.roundEnded" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="scheduledRounds" class="block text-sm font-medium text-gray-700">Scheduled Rounds</label>
      <input type="number" v-model="boutData.scheduledRounds" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterANumTimesKnockedDown" class="block text-sm font-medium text-gray-700">Fighter A Knocked Down</label>
      <input type="number" v-model="boutData.fighterANumTimesKnockedDown" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterBNumTimesKnockedDown" class="block text-sm font-medium text-gray-700">Fighter B Knocked Down</label>
      <input type="number" v-model="boutData.fighterBNumTimesKnockedDown" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterAOVR" class="block text-sm font-medium text-gray-700">Fighter A OVR</label>
      <input type="number" v-model="boutData.fighterAOVR" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterBOVR" class="block text-sm font-medium text-gray-700">Fighter B OVR</label>
      <input type="number" v-model="boutData.fighterBOVR" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterAWgt" class="block text-sm font-medium text-gray-700">Fighter A Weight</label>
      <input type="number" v-model="boutData.fighterAWgt" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="fighterBWgt" class="block text-sm font-medium text-gray-700">Fighter B Weight</label>
      <input type="number" v-model="boutData.fighterBWgt" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="weightClass" class="block text-sm font-medium text-gray-700">Weight Class</label>
      <input type="text" v-model="boutData.weightClass" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
      <input type="date" v-model="boutData.date" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="venue" class="block text-sm font-medium text-gray-700">Venue</label>
      <input type="text" v-model="boutData.venue" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <div class="mb-4">
      <label for="purse" class="block text-sm font-medium text-gray-700">Purse</label>
      <input type="number" v-model="boutData.purse" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-2 rounded">Create Bout</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

// Define the emits
const emit = defineEmits();

// Reactive object to hold form data
const boutData = ref({
  fighterA: '',
  fighterB: '',
  winner: '',
  loser: '',
  method: '',
  roundEnded: null,
  scheduledRounds: null,
  fighterANumTimesKnockedDown: null,
  fighterBNumTimesKnockedDown: null,
  fighterAOVR: null,
  fighterBOVR: null,
  fighterAWgt: null,
  fighterBWgt: null,
  weightClass: '',
  date: '',
  venue: '',
  purse: null,
});

// Method to handle form submission
const submitForm = () => {
  // Emit event with bout data to parent component
  emit('create-bout', boutData.value);
};
</script>

<style scoped>
/* Optional: Scoped styles for the form */
</style>
