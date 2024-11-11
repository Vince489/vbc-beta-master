<template>
  <div class="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg flex flex-col h-full">
    <!-- Chat Header -->
    <div class="flex items-center justify-between p-4 border-b">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-300"></div>
        <div>
          <p class="font-bold">Classicman_305</p>
          <p class="text-xs text-gray-500">Online</p>
        </div>
      </div>
      <button class="text-gray-600">Options</button>
    </div>

    <!-- Chat Messages -->
    <div class="p-4 flex-1 overflow-y-auto space-y-4">
      <!-- Dummy Incoming Message -->
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-gray-300"></div>
        <div class="bg-gray-100 p-3 rounded-lg">
          <p>Hello! How's everything going?</p>
        </div>
      </div>
      <!-- Dummy Outgoing Message (No Avatar) -->
      <div class="flex items-start gap-3 justify-end">
        <div class="bg-blue-500 text-white p-3 rounded-lg">
          <p>Hey! Everything’s good. How about you?</p>
        </div>
      </div>
      <!-- Another Incoming Message -->
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-gray-300"></div>
        <div class="bg-gray-100 p-3 rounded-lg">
          <p>I'm doing great! Just working on the new project.</p>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t">
      <div class="flex gap-2 items-center">
        <input type="text" placeholder="Message..." class="flex-1 p-2 border rounded-full">
        <button class="p-2 bg-blue-500 text-white rounded-full">Send</button>
      </div>
      <div class="flex gap-4 mt-2 text-gray-500">
        <button>❤️</button>
        <button>😂</button>
        <button>👍</button>
        <button>👊 Nudge</button>
        <button>📤 Share post</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatApp",
};
</script>

<style scoped>
/* Add custom styling for fixed positioning */
.flex-1 {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px); /* Adjust based on header/footer height */
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
