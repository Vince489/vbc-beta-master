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

          <!-- Second nav -->
          <div class="hidden md:flex items-center space-x-3">
            <template v-if="isAuthenticated">
              <button @click="logout" class="btn">Logout</button>
            </template>
            <template v-else>
              <nuxt-link to="/login" class="font-semibold py-1 px-3 text-gray-100">Login</nuxt-link>
              <nuxt-link to="/signup" class="btn text-gray-100">Sign up</nuxt-link>
            </template>
          </div>

          <!-- mobile button -->
          <div id="menu-btn" class="text-gray-100 md:hidden flex items-center space-x-2">
            <template v-if="!isAuthenticated">
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

      <!-- Container for the sidebar and header -->
      <div :class="{ 'transform translate-x-0': toggle_menu, 'transform translate-x-full': !toggle_menu }" id="mobile-menu" class="bg-gray-700 mobile-menu md:hidden transition-transform duration-300 fixed right-0 top-0 h-full w-80 overflow-y-auto rounded-tl-xl rounded-bl-xl border-l border-gray-500">
        
        <!-- Header -->
        <div class="flex justify-between items-center px-4 py-6 pb-8">
          <!-- Placeholder for logo or site name -->
          <div class="text-gray-400">Logo</div>
          
          <!-- Close button -->
          <button @click="toggle_menu = !toggle_menu" class="hover:bg-gray-600 hover:rounded p-2 text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="px-4 py-4 flex flex-col justify-start items-stretch">
          <!-- Profile link -->
          <!-- Add a separator line -->
          <div class="border-t border-gray-500 my-2"></div>
          <div class="flex text-gray-300 items-center pb-1">
            <nuxt-link to="/dashboard" class="text-gray-300 flex-grow">
              <div class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-4">
                <Icon class="text-gray-400" size="20" name="iconamoon:profile-thin" />
                <span class="ml-2">Profile</span>
              </div>
            </nuxt-link>
          </div>
          <!-- Account link -->
          <div class="flex text-gray-300 items-center">
            <nuxt-link to="/#wallet" class="text-gray-300 flex-grow">
              <div class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-4">
                <Icon class="text-gray-400" size="20" name="uit:wallet" />
                <span class="ml-2">Wallet</span>
              </div>
            </nuxt-link>
          </div>
          <!-- Add a separator line -->
          <div class="border-t border-gray-500 my-2"></div>
          <!-- Messages link -->
          <div class="flex text-gray-300 items-center">
            <nuxt-link to="/#messages" class="text-gray-300 flex-grow">
              <div class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-4">
                <Icon class="text-gray-400" size="20" name="circum:mail" />
                <span class="ml-2">Messages</span>
              </div>
            </nuxt-link>
          </div>

          <!-- Legacy link -->
          <div class="flex text-gray-300 items-center">
            <nuxt-link to="/#legacy" class="text-gray-300 flex-grow">
              <div class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-4">
                <Icon class="text-gray-400" size="20" name="ph:align-center-horizontal-light" />
                <span class="ml-2">Legacy Goals</span>
              </div>
            </nuxt-link>
          </div>

          <div class="flex text-gray-300 items-center">
            <nuxt-link to="/#settings" class="text-gray-300 flex-grow">
              <div class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-4">
                <Icon class="text-gray-400" size="20" name="clarity:bell-outline-badged" />
                <span class="ml-2">Bell</span>
              </div>
            </nuxt-link>
          </div>
          
          <!-- Settings link -->
          <div class="flex text-gray-300 items-center">
            <nuxt-link to="/#settings" class="text-gray-300 flex-grow">
              <div class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-4">
                <Icon class="text-gray-400" size="20" name="la:cog" />
                <span class="ml-2">Settings</span>
              </div>
            </nuxt-link>
          </div>

          <!-- Add a separator line -->
          <div class="border-t border-gray-500 my-2"></div>
          <!-- Log-out link -->
          <div class="flex text-gray-300 items-center">
            <nuxt-link to="/login" class="text-gray-300 flex-grow">
              <div @click="logout" class="hover:bg-gray-600 hover:rounded flex items-center py-1 px-2">
                <span class="ml-2">Logout</span>
              </div>
            </nuxt-link>
          </div>
          
          <!-- Add more links here -->
        </div>    
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore.js";
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
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
  router.push('/login');
}
</script>
