<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2 flex justify-center">
    <div>
      <!-- Use a conditional rendering to show loading text while userData is null -->
      <template v-if="!userData">
        <p class="text-center">Loading...</p>
      </template>
      <!-- Once userData is available, display user's information -->
      <template v-else>
        <div class="flex upper-fold py-6">
          <div class="content-center">
            <Avatar class="w-20 h-20">
              <AvatarImage src="img/chieffa.png" alt="fight" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <p class="pt-1 text-sm text-cyan-500">@OffgridVince</p>
          </div>
          <div class=" flex-grow p-4 flex justify-center items-center">
            <Button class="bg-cyan-800 hover:bg-cyan-600 font-semibold py-3 px-3 text-lg text-gray-100">
              <nuxt-link to="/register">Register Fighter</nuxt-link>
            </Button>
          </div>
        </div>


        <!-- Display the news feed -->
        <div>
          <div class="bg-gray-500 shadow-md rounded-md p-4 mb-4" v-for="post in newsFeed" :key="post.id">
            <div class="flex items-center">
              <img :src="post.user.avatarUrl" alt="User Avatar" class="w-10 h-10 rounded-full mr-2" />
              <div>
                <h6>{{ post.user.name }}</h6>
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// Dummy user data
const userData = {
  name: 'John Doe',
  // Add other user information as needed
};

// Dummy news feed data
const newsFeed = ref([
  {
    id: 1,
    user: {
      name: 'Jane Smith',
      avatarUrl: 'img/dd1.webp',
    },
    timestamp: '2 hours ago',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'img/ko.png',
  },
  {
    id: 2,
    user: {
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
