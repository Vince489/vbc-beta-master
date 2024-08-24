<template>
  <div class="pt-12 min-h-screen p-4">
    <!-- Conditional rendering based on gamer data -->
    <template v-if="gamerLoading">
      <p class="text-center">Loading...</p>
    </template>
    <template v-else>
      <!-- Chat History Section -->
      <div v-if="gamer && gamer.conversations">
        <p>{{ gamer.conversations }}</p>
        <!-- Uncomment and use your component if needed -->
        <!-- <div class="rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
          <ChatHistory :chats="formattedChats" />
        </div> -->
      </div>
      <div v-else>
        <p>No conversations available.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const gamer = ref(null);
const gamerLoading = ref(true);
const error = ref(null);
const formattedChats = ref([]);



// Fetch gamer data on component mount
onMounted(async () => {
  gamerLoading.value = true;
  try {
    console.log('Fetching gamer data');
    await authStore.fetchGamerData();
    gamer.value = authStore.currentGamer;
    console.log('Fetched gamer data:', gamer.value);
  } catch (error) {
    console.error('Error fetching gamer data:', error.message);
  } finally {
    gamerLoading.value = false;
  }
});



</script>

<style scoped>
/* Custom styles can be added here if necessary */
</style>
