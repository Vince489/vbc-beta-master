<template>
  <section class="relative h-screen">
    <div class="overflow-hidden">
      <img class="absolute inset-0 h-full w-full object-cover" src="/img/lee-ko.png" alt="hero image">
    </div>

    <div class="overlay absolute inset-0 bg-black opacity-40"></div>

    <div class="container lg:pt-24 pt-40 mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-24">
      <div class="flex justify-start">
        <div class="lg:w-1/2 text-center relative">
          <div class="space-y-6 mb-10">
            <h2 class="text-gray-100 text-6xl lg:text-8xl leading-tight capitalize font-semibold">
              SIM BOXING LEAGUE
            </h2>
            <p class="text-gray-100 text-3xl font-semibold">
              Don't leave it to the judges.
            </p>
            <p class="text-gray-100 text-lg">
              Professional (NO HUD) Boxing.
            </p>
            <button class="w-9/12 bg-[#0b7696] py-2 rounded-xl" @click="handleJoinNowClick" v-if="!isAuthenticated">
              Join Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from "~/stores/authStore.js";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.currentGamer);


const router = useRouter();

function handleJoinNowClick() {
  // Handle the click event here
  // For example, you can redirect to the sign-up page:
  router.push('/signup');
}
</script>
