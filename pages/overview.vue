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
          <div>
            <Avatar class="w-20 h-20">
              <AvatarImage :src="gamer.image" alt="fight" />       
              <AvatarFallback class="text-4xl">{{ firstLetterOfGamerTag }}</AvatarFallback>
            </Avatar>
            <p class="pt-1 text-sm text-cyan-600 font-semibold font-mono tracking-wide">@{{ gamer.gamerTag }}</p>
          </div>

          <div class="flex flex-col justify-end">
            <Button class="bg-cyan-800 hover:bg-cyan-600 font-semibold px-3 text-lg text-gray-100">
              <nuxt-link to="/register">Register Fighter</nuxt-link>
            </Button>
          </div>
        </div>

        <!-- Display fighter cards -->
        <div class="grid grid-cols-1 gap-4 mt-4">
          <template v-for="fighter in gamer.fighters" :key="fighter._id">
            <div class="border p-4 rounded shadow hover:bg-gray-100">
              <nuxt-link :to="`/fighters/${fighter._id}`" class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img :src="fighter.image || defaultFighterImage" alt="fighter" class="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <p class="text-lg font-semibold">{{ fighter.firstName }} {{ fighter.lastName }}</p>
                  <p class="text-sm text-gray-400">{{ fighter.weightClass }}</p>
                  <p class="text-sm text-gray-400">({{ fighter.wins }}-{{ fighter.losses }}-{{ fighter.draws }})</p>
                </div>
              </nuxt-link>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'; 
import { ref } from 'vue';

// Fetch user data from the auth store
const authStore = useAuthStore();
const gamer = authStore.currentGamer;

//  Get the first letter of the gamerTag
const firstLetterOfGamerTag = gamer && gamer.gamerTag ? gamer.gamerTag.charAt(0).toUpperCase() : '';

// Default fighter image
const defaultFighterImage = '/path/to/default-fighter-image.jpg'; // Replace with your default image path

</script>


