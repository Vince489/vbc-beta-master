<template>
  <div class="pt-12 min-h-screen p-4 bg-gray-900 text-white">
    <template v-if="gamerLoading">
      <p class="text-center">Loading...</p>
    </template>
    <template v-else>
      <div v-if="gamer && gamer.conversations.length">
        <!-- Chat Header -->
        <div class="flex items-center overflow-x-auto space-x-4 p-4">
          <div v-for="(conversation, index) in gamer.conversations" :key="index" class="flex-shrink-0">
            <div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xs">
              <!-- Show the recipient's avatar if you're the sender, otherwise show the sender's avatar -->
              <img :src="getAvatar(conversation)" class="w-full h-full rounded-full object-cover">
            </div>
            <p class="text-center text-sm mt-2">
              <!-- Show the recipient's gamerTag if you're the sender, otherwise show the sender's gamerTag -->
              {{ getGamerTag(conversation) }}
            </p>
          </div>
        </div>

        <!-- Chat History -->
        <ChatHistory :gamer="gamer" />
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

// Helper function to get avatar URL from a conversation
function getAvatar(conversation) {
  const latestChat = conversation.chats[conversation.chats.length - 1];
  return latestChat ? (latestChat.senderId?._id === gamer.value._id ? latestChat.receiverId?.image : latestChat.senderId?.image) || 'default-avatar.png' : 'default-avatar.png';
}

// Helper function to get gamer tag from a conversation
function getGamerTag(conversation) {
  const latestChat = conversation.chats[conversation.chats.length - 1];
  return latestChat ? (latestChat.senderId?._id === gamer.value._id ? latestChat.receiverId?.gamerTag : latestChat.senderId?.gamerTag) : 'Unknown';
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
