<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2 flex justify-center">
    <div>
      <!-- Use a conditional rendering to show loading text while userData is null -->
      <template v-if="!gamer">
        <p class="text-center">Loading...</p>
      </template>
      <!-- Once userData is available, display user's information -->
      <template v-else>
        <div class="pb-3 upper-fold pt-4 grid grid-cols-2">
          <div class="">
            <Avatar class="w-20 h-20">
              <AvatarImage :src="gamer.image" alt="fight" />       <AvatarFallback class="text-4xl">{{ firstLetterOfGamerTag }}</AvatarFallback>
            </Avatar>
            <p class="pt-1 text-sm text-cyan-600 font-semibold font-mono tracking-wide">@{{ gamer.gamerTag }}</p>
          </div>

          <div class="flex flex-col justify-end">
            <Button class="bg-cyan-800 hover:bg-cyan-600 font-semibold px-3 text-lg text-gray-100">
              <nuxt-link to="/registerFighter">Register Fighter</nuxt-link>
            </Button>
          </div>

        </div>
      </template>
      {{ gamer }}
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'; 

// Fetch user data from the auth store
const authStore = useAuthStore();
const gamer = authStore.currentGamer;

//  Get the first letter of the gamerTag
const firstLetterOfGamerTag = gamer && gamer.gamerTag ? gamer.gamerTag.charAt(0).toUpperCase() : '';

</script>
