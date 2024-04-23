<template>
  <div class="px-4 lg:px-6 max-w-screen-lg mx-auto">
    <!-- navbar goes here -->
    <nav id="Navbar" class="pt-2 z-40 bg-gray-900 fixed inset-x-0">
      <div class="px-6 pb-2 mx-auto">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <!-- logo -->
            <div>
              <nuxt-link
                to="/"
                class="flex items-center py-3 px-3 text-gray-300">
                <span class="text-3xl font-bold">VBC</span>
              </nuxt-link>
            </div>

            <!-- primary nav-->
            <div class="hidden md:flex items-center space-x-3">
              <nuxt-link to="/fighters" class="font-semibold py-3 px-3 text-lg text-gray-100">FytRec</nuxt-link>
              <!-- <nuxt-link to="/ebca" class="font-semibold py-3 px-3 text-lg text-gray-100">EBCA</nuxt-link>
              <nuxt-link to="#/promoters" class="font-semibold py-3 text-lg px-3 text-gray-100">Promoters</nuxt-link> -->
              <nuxt-link to="/about" class="font-semibold py-3 px-3 text-lg text-gray-100">About</nuxt-link>
              <!-- <nuxt-link to="#/contact" class="font-semibold py-3 px-3 text-lg text-gray-100">Contact</nuxt-link> -->
              <nuxt-link v-if="isAuthenticated" to="/dashboard" class="font-semibold py-3 px-3 text-lg text-gray-100">Dashboard</nuxt-link>
            </div>
          </div>

          <!-- Second nav -->
          <div class="hidden md:flex items-center space-x-3">
            <template v-if="isAuthenticated">
              <nuxt-link @click="logout" class="btn">Logout</nuxt-link>
            </template>
            <template v-else>
              <nuxt-link to="login" class="font-semibold py-1 px-3 text-gray-100">Login</nuxt-link>
              <nuxt-link to="signup" class="btn">Sign up</nuxt-link>
            </template>
          </div>

          <!-- mobile button-->
          <div id="menu-btn" class="text-gray-100 md:hidden flex items-center">
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

  <!--mobile menu-->
  <div v-if="toggle_menu" id="mobile-menu" class="bg-gray-700 mobile-menu md:hidden">
    <nuxt-link v-if="isAuthenticated" to="/dashboard" class="text-gray-100 block py-3 px-4 hover:bg-gray-600">Dashboard</nuxt-link>
    <nuxt-link to="/fighters" class="text-gray-100 block py-3 px-4 hover:bg-gray-600">FytRec</nuxt-link>
    <nuxt-link to="/about" class="text-gray-100 block py-3 px-4 hover:bg-gray-600">About</nuxt-link>
    <button v-if="isAuthenticated" @click="logout" class="text-gray-100 block py-3 px-4 hover:bg-gray-600">Logout</button>
    <template v-else>
      <nuxt-link to="/login" class="text-gray-100 block py-3 px-4 hover:bg-gray-600">Login</nuxt-link>
      <nuxt-link to="/signup" class="text-gray-100 block py-3 px-4 hover:bg-gray-600">Sign up</nuxt-link>
    </template>
  </div>

    </nav>
  </div>
</template>

<script setup>
import {useAuthStore} from "~/stores/authStore.js";
import {ref, onMounted} from 'vue';

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated);
const router = useRouter(); // Import useRouter function

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