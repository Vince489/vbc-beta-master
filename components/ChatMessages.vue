<template>
  <div class="chat-container">
    <div v-if="messages.length">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="message-header">
          <img :src="getAvatar(message)" alt="Avatar" class="avatar" />
          <span class="sender">{{ getSenderName(message) }}</span>
        </div>
        <div class="message-body">
          <p>{{ message.message }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No messages available.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  }
});

// Helper function to get avatar URL
function getAvatar(message) {
  // Check if the sender has an avatar
  const avatar = '/default-avatar.png'; // Use a default avatar URL
  console.log('Avatar for message:', message, 'is:', avatar); // Log avatar URL
  return avatar;
}

// Helper function to get the sender's name
function getSenderName(message) {
  // Assume sender information is available or fetch it if needed
  const senderName = 'Unknown Sender'; // Default if name not found
  console.log('Sender for message:', message, 'is:', senderName); // Log sender name
  return senderName;
}

// Log the messages prop to see the data being passed
console.log('Messages prop:', props.messages);
</script>

<style scoped>
.chat-container {
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.message {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.sender {
  font-weight: bold;
}

.message-body p {
  margin: 0;
}
</style>
