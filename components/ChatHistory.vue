<template>
  <div class="space-y-4 mt-4">
    <div
      v-for="(conversation, index) in gamer.conversations"
      :key="conversation._id"
      class="p-4 bg-gray-800 rounded-lg cursor-pointer"
      @click="navigateToChat(conversation)"
    >
      <div class="flex space-x-4">
        <!-- Avatar -->
        <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xs">
          <img :src="getAvatar(conversation)" class="w-full h-full rounded-full object-cover" alt="Avatar">
        </div>
        <!-- Conversation Details -->
        <div class="flex-1 relative">
          <div class="flex justify-between items-start">
            <!-- Gamer Tag -->
            <p class="text-sm font-semibold">{{ getGamerTag(conversation) }}</p>
            <!-- Timestamp of the last message -->
            <p class="text-xs text-gray-400 absolute top-0 right-0">{{ formatDate(conversation.lastMessageTimestamp) }}</p>
          </div>
          <!-- Last Message -->
          <p class="text-sm text-gray-300 mt-1">{{ truncateMessage(conversation.lastMessage) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  gamer: {
    type: Object,
    required: true
  }
});

const router = useRouter();

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function truncateMessage(message) {
  const maxLength = 50;
  return (message && message.length > maxLength) ? `${message.slice(0, maxLength)}...` : message || '';
}

function getAvatar(conversation) {
  if (conversation.chats && conversation.chats.length > 0) {
    const chat = conversation.chats[0];
    const avatar = chat.senderId?._id === props.gamer._id ? chat.receiverId?.image : chat.senderId?.image;
    return avatar || 'default-avatar.png';
  }
  return 'default-avatar.png';
}

function getGamerTag(conversation) {
  if (conversation.chats && conversation.chats.length > 0) {
    const chat = conversation.chats[0];
    return chat.senderId?._id === props.gamer._id ? chat.receiverId?.gamerTag : chat.senderId?.gamerTag;
  }
  return 'Unknown Gamer';
}

function navigateToChat(conversation) {
  router.push({ 
    path: '/chatMessage', 
    query: { 
      conversationId: conversation._id 
    }
  });
}
</script>
