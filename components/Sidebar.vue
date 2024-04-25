<template>
  <aside id="sidebar" class="bg-gray-900 text-gray-100 h-full w-64 fixed right-0 top-0 overflow-y-auto rounded-tl-lg rounded-bl-lg border-l border-gray-400 transition-transform duration-100 transform translate-x-0">
    <!-- Sidebar content -->

  </aside>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore.js";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const router = useRouter();

function logout() {
  authStore.$reset();
  router.push('/login');
}
</script>
