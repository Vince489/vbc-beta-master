<template>
  <aside id="sidebar" class="bg-gray-900 text-gray-100 h-full w-64 fixed right-0 top-0 overflow-y-auto rounded-tl-lg rounded-bl-lg border-l border-gray-400">
    <!-- Sidebar content -->
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4">Sidebar</h2>
      <p>This is the sidebar content.</p>
    </div>
    <!-- Close button -->
    <button @click="closeSidebar" class="absolute top-0 right-0 m-4 text-gray-300 hover:text-white focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function closeSidebar() {
  // Close the sidebar (toggleMenu function from Navbar.vue)
  router.push('/');
}
</script>

<style scoped>
/* Add your sidebar styling here */
</style>
