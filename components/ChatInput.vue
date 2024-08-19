<template>
  <div class="flex items-center">
    <input
      v-model="newMessage"
      type="text"
      class="flex-1 p-2 border border-gray-300 rounded-l-lg"
      placeholder="Type your message..."
    />
    <button
      @click="sendMessage"
      class="p-2 bg-blue-500 text-white rounded-r-lg"
    >
      Send
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    // Emit the new message event
    emit('sendMessage', newMessage.value)
    newMessage.value = ''
  }
}
</script>
