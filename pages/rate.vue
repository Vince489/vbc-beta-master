<template>
  <div class="container mx-auto px-4 mt-8">
    <template v-if="gamerLoading">
      <p class="text-center">Loading...</p>
    </template>
    <template v-else>
      <div class="bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl text-gray-300 font-bold mb-4">Rate a Bout</h1>
        <form @submit.prevent="submitRating">
          <div class="mb-4">
            <label for="opponentOVR" class="block text-gray-400">Opponent Overall Rating</label>
            <input v-model="ratingData.opponentOVR" type="number" id="opponentOVR" required class="input-field" />
          </div>
          <div class="mb-4">
            <label for="yourOVR" class="block text-gray-400">Your Overall Rating</label>
            <input v-model="ratingData.yourOVR" type="number" id="yourOVR" required class="input-field" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-400">Win by KO?</label>
            <input type="checkbox" v-model="ratingData.winByKO" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-400">Draw?</label>
            <input type="checkbox" v-model="ratingData.draw" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-400">Loss by KO?</label>
            <input type="checkbox" v-model="ratingData.lossByKO" />
          </div>
          <Button type="submit" class="bg-cyan-800 hover:bg-cyan-600 font-semibold text-gray-100 w-full">
            Submit Rating
          </Button>
        </form>
        <p v-if="submitSuccess" class="mt-4 text-green-500">Rating submitted successfully!</p>
        <p v-if="submitError" class="mt-4 text-red-500">Error: {{ submitError }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const gamer = ref(null);
const gamerLoading = ref(true);
const ratingData = ref({
  opponentOVR: '',
  yourOVR: '',
  winByKO: false,
  draw: false,
  lossByKO: false,
});
const submitSuccess = ref(false);
const submitError = ref(null);

// Fetch gamer data on component mount
onMounted(async () => {
  gamerLoading.value = true;
  try {
    await authStore.fetchGamerData();
    gamer.value = authStore.currentGamer;
  } catch (error) {
    console.error('Error fetching gamer data:', error.message);
  } finally {
    gamerLoading.value = false;
  }
});

// Check if the user can rate bouts based on their roles
const canRateBouts = computed(() => {
  return gamer.value?.roles?.includes('manager') || gamer.value?.roles?.includes('fighter'); // Adjust this based on your role structure
});

// Submit the rating
async function submitRating() {
  if (!canRateBouts.value) {
    submitError.value = 'You are not authorized to rate bouts.';
    return;
  }

  try {
    const response = await fetch(`http://localhost:5550/api/v1/fighter/rate-bout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ fighterId: gamer.value._id, boutInfo: ratingData.value }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit rating');
    }

    submitSuccess.value = true;
    submitError.value = null;
    // Reset form fields after submission
    ratingData.value = {
      opponentOVR: '',
      yourOVR: '',
      winByKO: false,
      draw: false,
      lossByKO: false,
    };
  } catch (error) {
    console.error('Error submitting rating:', error.message);
    submitError.value = error.message;
  }
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #1f2937; /* Dark background */
  color: #e5e7eb; /* Light text */
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6; /* Blue border on focus */
}
</style>
