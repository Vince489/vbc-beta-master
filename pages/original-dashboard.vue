<template>
  <div class="px-4 lg:px-6 max-w-screen-lg mx-auto">
    <!-- navbar goes here -->
    <nav id="Navbar" class="pt-2 z-40 bg-gray-800 fixed inset-x-0">
      <div class="px-6 pb-2 mx-auto">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <!-- logo -->
            <div>
              <nuxt-link
                to="/"
                class="flex items-center py-3 px-3 text-gray-100">
                <span class="text-3xl font-bold">VBC</span>
              </nuxt-link>
            </div>

            <!-- primary nav-->
            <div class="hidden md:flex items-center space-x-3">
              <nuxt-link to="/fighters" class="font-semibold py-3 px-3 text-lg text-gray-100">FytRec</nuxt-link>
              <nuxt-link to="/ebca" class="font-semibold py-3 px-3 text-lg text-gray-100">EBCA</nuxt-link>
              <nuxt-link to="#/promoters" class="font-semibold py-3 text-lg px-3 text-gray-100">Promoters</nuxt-link>
              <nuxt-link to="/about" class="font-semibold py-3 px-3 text-lg text-gray-100">About</nuxt-link>
              <nuxt-link to="#/contact" class="font-semibold py-3 px-3 text-lg text-gray-100">Contact</nuxt-link>
            </div>
          </div>

          <!--second nav-->
          <div class="hidden md:flex items-center space-x-3">
            <!-- Conditionally display logout button -->
            <button v-if="isLoggedIn" @click="logout" class="font-semibold py-1 px-3 text-gray-300">Logout</button>
            <!-- Otherwise, display login and signup buttons -->
            <nuxt-link v-else to="login" class="font-semibold py-1 px-3 text-gray-300">Login</nuxt-link>
            <nuxt-link v-else to="signup" class="btn">Sign up</nuxt-link>
          </div>

          <!-- mobile button-->
          <div id="menu-btn" class="text-gray-100 md:hidden flex items-center">
            <button @click="toggleMenu" class="mobile-menu-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
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

      <!--mobile menu-->
      <div v-if="toggle_menu" id="mobile-menu" class="mobile-menu md:hidden">
        <nuxt-link to="/fighters" class="text-gray-100 block py-3 px-4 hover:bg-gray-200">FytRec</nuxt-link>
        <button v-if="isLoggedIn" @click="logout" class="font-semibold py-1 px-3 text-gray-300">Logout</button>
        <nuxt-link v-else to="login" class="text-gray-100 block py-3 px-4 hover:bg-gray-200">Login</nuxt-link>
        <nuxt-link v-else to="signup" class="text-gray-100 block py-3 px-4 hover:bg-gray-200">Sign up</nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const isLoggedIn = authStore.isLoggedIn;

function logout() {
  // Perform logout operation
}

let toggle_menu = ref(false);
let toggle_profile = ref(false);

onMounted(() => {
  window.addEventListener("click", function (e) {
    if (
      document.getElementById("mobile-menu") &&
      !document.getElementById("menu-btn").contains(e.target)
    ) {
      toggle_menu.value = false;
    }
    if (
      document.getElementById("profile-menu") &&
      !document.getElementById("profile-btn").contains(e.target)
    ) {
      toggle_profile.value = false;
    }
  });
});

function toggleMenu() {
  toggle_menu.value = !toggle_menu.value;
}

function toggleProfile() {
  toggle_profile.value = !toggle_profile.value;
}
</script>
