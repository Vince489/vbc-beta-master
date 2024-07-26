<template>
  <div class="px-2 lg:px-6 max-w-screen-lg mx-auto">
    <!-- navbar goes here -->
    <nav id="Navbar" class="pt-1 z-40 bg-gray-800 fixed inset-x-0">
      <div class="px-4 pb-2 mx-auto">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <!-- logo -->
            <div>
              <nuxt-link to="/" class="flex items-center py-3 px-3 text-gray-300">
                <img src="/img/logo21.png" alt="Logo" class="h-12"> <!-- Adjust class "h-12" as needed for logo size -->
              </nuxt-link>
            </div>

            <!-- primary nav-->
            <div class="hidden md:flex items-center space-x-3">
              <nuxt-link to="/fighters" class="font-semibold py-3 px-3 text-lg text-gray-100">FytRec</nuxt-link>
              <nuxt-link to="#" class="font-semibold py-3 px-3 text-lg text-gray-100">Promoters</nuxt-link>
              <nuxt-link to="/eac" class="font-semibold py-3 px-3 text-lg text-gray-100">EAC</nuxt-link>
              <nuxt-link to="#" class="font-semibold py-3 px-3 text-lg text-gray-100">Events</nuxt-link>
              <nuxt-link to="#" class="font-semibold py-3 px-3 text-lg text-gray-100">Leaderboard</nuxt-link>
              <nuxt-link to="#" class="font-semibold py-3 px-3 text-lg text-gray-100">Fight Hype</nuxt-link>
              <nuxt-link to="/about" class="font-semibold py-3 px-3 text-lg text-gray-100">About</nuxt-link>
            </div>
          </div>

          <!-- Second nav -->
          <div class="hidden md:flex items-center space-x-3">
            <template v-if="authStore.currentGamer">
              <nuxt-link to="/dashboard" class="font-semibold py-1 px-3 text-gray-100">Dashboard</nuxt-link>
              <button @click="logout" class="text-gray-100">Logout</button>
            </template>
            <template v-else>
              <nuxt-link to="/login" class="font-semibold py-1 px-3 text-gray-100">Login</nuxt-link>
              <nuxt-link to="/signup" class="btn text-gray-100">Sign up</nuxt-link>
            </template>
          </div>

          <!-- mobile button -->
          <div id="menu-btn" class="text-gray-100 md:hidden flex items-center space-x-2">
            <template v-if="!authStore.currentGamer">
              <nuxt-link to="/login" class="text-gray-100 font-semibold border border-gray-100 py-1 px-2 rounded-lg hover:bg-gray-100 hover:text-gray-900">Login</nuxt-link>
            </template>
            <!-- Always display the hamburger icon -->
            <button @click="toggleMenu" class="mobile-menu-button border border-gray-300 rounded-md p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore.js";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const toggle_menu = ref(false);

onMounted(() => {
  window.addEventListener("click", function (e) {
    if (document.getElementById("mobile-menu") && !document.getElementById("menu-btn").contains(e.target)) {
      toggle_menu.value = false;
    }
  });
});

function toggleMenu() {
  toggle_menu.value = !toggle_menu.value;
}

function logout() {
  authStore.$reset();
  router.push('/login');
}
</script>
