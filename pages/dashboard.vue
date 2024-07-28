<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-12 flex justify-center">
    <div>
      <!-- Use a conditional rendering to show loading text while gamerData is null -->
      <template v-if="!gamer">
        <p class="text-center">Loading...</p>
      </template>
      <!-- Once gamerData is available, display gamer's information -->
      <template v-else>
 
  <!-- Display the news feed -->
        <div>
          <div class="bg-gray-500 shadow-md rounded-md p-4 mb-4" v-for="post in newsFeed" :key="post.id">
            <div class="flex items-center">
              <NuxtImg :src="post.gamer.avatarUrl" alt="gamer Avatar" class="w-10 h-10 rounded-full mr-2" />
              <div>
                <h6>{{ post.gamer.name }}</h6>
                <p>{{ post.timestamp }}</p>
              </div>
            </div>
            <div class="mt-2">
              <p>{{ post.content }}</p>
              <img v-if="post.image" :src="post.image" alt="Post Image" class="w-full mt-2 rounded-md" />
            </div>
            <div class="mt-4 flex justify-center items-center">
              <button @click="repost(post.id)" class="text-white px-4 py-2 rounded-md mr-2">
                <Icon class="text-gray-200" size="20" name="mdi:repeat" />                
              </button>
              <button @click="like(post.id)" class="text-white px-4 py-2 rounded-md mr-2">
                <Icon class="text-gray-200" size="20" name="mdi:comment-multiple" />                
              </button>
              <button @click="share(post.id)" class="text-white px-4 py-2 rounded-md">
                <Icon class="text-gray-200" size="20" name="mdi:thumb-up" />
                1.2K
              </button>
              <button @click="share(post.id)" class="text-white px-4 py-2 rounded-md">
                <Icon class="text-gray-200" size="20" name="mdi:share-all" />
              </button>          
            </div>

          </div>
        </div>
  <!-- ... rest of your code ... -->
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'; 

// Fetch gamer data from the auth store
const authStore = useAuthStore();
const gamer = authStore.currentGamer;
import { onMounted, ref } from 'vue';

// Dummy news feed data
const newsFeed = ref([
  {
    id: 1,
    gamer: {
      name: 'Jane Smith',
      avatarUrl: 'img/dd1.webp',
    },
    timestamp: '2 hours ago',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'img/ko.png',
  },
  {
    id: 2,
    gamer: {
      name: 'Alice Johnson',
      avatarUrl: 'img/chieffa.png',
    },
    timestamp: '1 day ago',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    image: null, // No image for this post
  },
  // Add more news posts as needed
]);

// Dummy methods to handle actions (replace with actual logic)
const repost = (postId) => {
  console.log('Repost:', postId);
};

const like = (postId) => {
  console.log('Like:', postId);
};

const share = (postId) => {
  console.log('Share:', postId);
};

// Fetch additional data or perform other actions when the component is mounted
onMounted(() => {
  // Dummy logic
});
</script>
