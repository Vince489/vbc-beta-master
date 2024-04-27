<template>
  <div class="px-2 lg:px-6 max-w-screen-lg mx-auto">
    <!-- navbar goes here -->
    <nav id="Navbar" class="pt-2 z-40 bg-gray-900 fixed inset-x-0">
      <div class="px-4 pb-2 mx-auto">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <!-- logo -->
            <div>
              <nuxt-link to="/" class="flex items-center py-3 px-3 text-gray-300">
                <span class="text-3xl font-bold">VBC</span>
              </nuxt-link>
            </div>

            <!-- primary nav-->
            <div class="hidden md:flex items-center space-x-3">
              <nuxt-link to="/fighters" class="font-semibold py-3 px-3 text-lg text-gray-100">FytRec</nuxt-link>
              <nuxt-link to="/about" class="font-semibold py-3 px-3 text-lg text-gray-100">About</nuxt-link>
            </div>
          </div>

          <!-- Second nav (hidden on mobile) -->
<div class="hidden md:flex items-center space-x-3">
  <template v-if="isAuthenticated">
    <!-- Logout button -->
    <button @click="logout" class="btn">Logout</button>
  </template>
</div>

<!-- Mobile button -->
<div id="menu-btn" class="text-gray-100 md:hidden flex items-center space-x-2">
  <template v-if="isAuthenticated">
    <!-- Logout button -->
    <button @click="logout" class="font-semibold border border-gray-100 py-1 px-2 rounded-lg hover:bg-gray-100 hover:text-gray-900">Logout</button>
  </template>
  <template v-else>
    <!-- Sign in button -->
    <nuxt-link to="/login" class="font-semibold border border-gray-100 py-1 px-2 rounded-lg hover:bg-gray-100 hover:text-gray-900">Sign in</nuxt-link>
  </template>

  <!-- Mobile menu button -->
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

      <!-- mobile menu-->
      <div :class="{ 'transform translate-x-0': toggle_menu, 'transform translate-x-full': !toggle_menu }" id="mobile-menu" class="bg-gray-700 mobile-menu md:hidden transition-transform duration-300 fixed right-0 top-0 h-full w-80 overflow-y-auto">
        <!-- Sidebar content -->
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore.js";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated);
const router = useRouter();

let toggle_menu = ref(false);

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
  // redirect to login page
  router.push('/login');
}
</script>
