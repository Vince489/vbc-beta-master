<template>
  <div class="pt-12 min-h-screen p-4">
    <ChatMessages :messages="messages" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ChatMessages from '~/components/ChatMessages.vue'; // Ensure the correct import path

const route = useRoute();
const messages = ref([]);

onMounted(async () => {
  const conversationId = route.query.conversationId;
  const token = localStorage.getItem('authToken'); // Ensure token is stored in localStorage

  console.log('Conversation ID:', conversationId);
  console.log('Token:', token); // Check if token is null

  if (conversationId && token) {
    try {
      const response = await fetch(`https://vbc-login-production.up.railway.app/api/v1/conversation/${conversationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched Data:', data);
      

      messages.value = data.chats || []; // Adjust based on how the data is structured
      console.log('Messages:', messages.value);
      console.log('Messages:', JSON.parse(JSON.stringify(messages)));

    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.warn('Conversation ID or Token is missing');
  }
});
</script>
