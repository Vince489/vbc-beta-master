<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2 flex justify-center">
    <div>
      <!-- Use a conditional rendering to show loading text while userData is null -->
      <template v-if="!userData">
        <p>Loading...</p>
      </template>
      <!-- Once userData is available, display user's information -->
      <template v-else>
        <div class="pt-4 cursor-pointer hover:cursor-pointer">
          <p class="text-slate-300">hello</p>
        </div>

        <div>
          <!-- Additional user information can be added here -->
        </div>

        <!-- Newsfeed -->
        <div>
          <h2 class="text-xl font-bold mb-4">Newsfeed</h2>
          <div v-for="news in newsfeed" :key="news.id">
            <div class="border p-4 mb-4">
              <h3 class="text-lg font-bold">{{ news.title }}</h3>
              <p>{{ news.content }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// ...existing code...

// Dummy newsfeed data
const newsfeed = ref([
  { id: 1, title: 'News 1', content: 'This is the content of News 1.' },
  { id: 2, title: 'News 2', content: 'This is the content of News 2.' },
  // Add more news objects as needed
]);
</script>

<style scoped>
</style>