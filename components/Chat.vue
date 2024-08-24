<template>
  <div class="flex flex-col h-screen p-4 bg-gray-100">
    <div class="flex-1 overflow-y-auto mb-4">
      <div v-for="(msg, index) in messages" :key="index" class="mb-2">
        <div class="p-2 rounded-lg" :class="msg.isOwnMessage ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'">
          {{ msg.text }}
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="flex">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type a message..."
        class="flex-1 p-2 rounded-l-lg border border-gray-300"
      />
      <button
        type="submit"
        class="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const messages = ref([
  // Sample initial messages
  { text: 'Hello!', isOwnMessage: false },
  { text: 'Hi there!', isOwnMessage: true }
])

const newMessage = ref('')

// Injecting the socket instance from the Nuxt app
const { $socket } = useNuxtApp()

// Listening for incoming messages
$socket.on('chat message', (msg) => {
  messages.value.push({ text: msg, isOwnMessage: false })
})

// Sending a new message
const sendMessage = () => {
  if (newMessage.value.trim() === '') return

  // Emit the message to the server
  $socket.emit('chat message', newMessage.value)

  // Add the message to the local message list
  messages.value.push({ text: newMessage.value, isOwnMessage: true })

  // Clear the input field
  newMessage.value = ''
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
