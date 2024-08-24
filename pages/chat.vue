<template>
  <div class="pt-12 min-h-screen p-4">
    <!-- Stories Section -->
    <Stories :stories="stories" />

    <!-- Chat History Section -->
    <div class="rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
      <ChatHistory :chats="chats" />
    </div>
  </div>
</template>

<script setup>

const placeholderUrl = 'https://via.placeholder.com/150';

const stories = [
  { id: 1, name: 'My Story', avatar: `${placeholderUrl}`, isNew: true },
  { id: 2, name: 'Zkairr K.', avatar: `${placeholderUrl}`, isNew: false },
  { id: 3, name: 'Suhana', avatar: `${placeholderUrl}`, isNew: false },
  { id: 4, name: 'Aniton', avatar: `${placeholderUrl}`, isNew: true },
  { id: 5, name: 'Karima', avatar: `${placeholderUrl}`, isNew: false },
];

const chats = [
  { id: 1, name: 'Weekend Plan', avatar: `${placeholderUrl}`, message: 'Sima: Is there any plan on this...', timestamp: '11:30 PM', isOnline: false, isTyping: false },
  { id: 2, name: 'Albert Flores', avatar: `${placeholderUrl}`, message: 'This is nice, I love it ❤️', timestamp: '12:55 AM', isOnline: true, isTyping: false },
  { id: 3, name: 'Marzuki Linos', avatar: `${placeholderUrl}`, message: 'What are you doing now?', timestamp: 'Just Now', isOnline: true, isTyping: true },
  { id: 4, name: 'Guy Hawkins', avatar: `${placeholderUrl}`, message: 'Typing...', timestamp: 'Yesterday', isOnline: true, isTyping: true },
  { id: 5, name: 'Kristin Watson', avatar: `${placeholderUrl}`, message: 'Sent you an image', timestamp: '14/12/2022', isOnline: false, isTyping: false },
];
</script>

<style scoped>
/* Custom styles can be added here if necessary */
</style>