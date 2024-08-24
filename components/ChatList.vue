<template>
  <div class="max-w-md mx-auto p-4">
    <!-- Story Section -->
    <div class="flex space-x-3 mb-4">
      <Avatar v-for="story in stories" :key="story.name" class="relative">
        <img :src="story.image" alt="story" class="w-12 h-12 rounded-full" />
        <Label v-if="story.isNew" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></Label>
        <p class="text-xs text-center mt-1 truncate">{{ story.name }}</p>
      </Avatar>
    </div>

    <!-- Chat List Section -->
    <div>
      <div v-for="chat in chats" :key="chat.id" class="flex items-center justify-between py-3 border-b border-gray-200">
        <Avatar class="w-12 h-12 relative">
          <img :src="chat.avatar" alt="avatar" class="rounded-full" />
          <Label v-if="chat.isOnline" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></Label>
        </Avatar>
        <div class="ml-3 flex-1">
          <p class="text-sm font-semibold text-gray-900">{{ chat.name }}</p>
          <p class="text-xs text-gray-600 truncate">{{ chat.message }}</p>
        </div>
        <div class="text-xs text-gray-400">
          <p>{{ chat.time }}</p>
          <p v-if="chat.isTyping" class="text-green-500">Typing...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stories = [
  { name: 'My Story', image: '/path/to/image1.jpg', isNew: true },
  { name: 'Zkair K.', image: '/path/to/image2.jpg', isNew: false },
  { name: 'Suhana', image: '/path/to/image3.jpg', isNew: false },
  { name: 'Aniton', image: '/path/to/image4.jpg', isNew: false },
  { name: 'Karima', image: '/path/to/image5.jpg', isNew: false },
];

const chats = [
  { id: 1, name: 'Weekend Plan', avatar: '/path/to/avatar1.jpg', message: 'Sima: is there any plan on thi...', time: '11:30 PM', isOnline: false },
  { id: 2, name: 'Albert Flores', avatar: '/path/to/avatar2.jpg', message: 'This is nice, I love it ❤️', time: '12:55 AM', isOnline: true },
  { id: 3, name: 'Marzuki Linos', avatar: '/path/to/avatar3.jpg', message: 'What are you doing now ?', time: 'Just Now', isOnline: true },
  { id: 4, name: 'Guy Hawkins', avatar: '/path/to/avatar4.jpg', message: '', time: 'Yesterday', isTyping: true, isOnline: false },
  { id: 5, name: 'Kristin Watson', avatar: '/path/to/avatar5.jpg', message: 'Sent you image', time: '14/12/2022', isOnline: false },
];
</script>

<style scoped>
/* Additional styles if needed */
</style>
