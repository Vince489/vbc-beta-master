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

        <!-- Fighter Cards Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <template v-for="fighter in gamer.fighters" :key="fighter._id">
            <div class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" @click="goToFighterPage(fighter._id)">
              <div class="relative">
                <img :src="fighter.image" alt="Fighter Image" class="w-full h-32 object-cover">
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ fighter.firstName }} {{ fighter.lastName }}</h3>
                <p class="text-gray-600">Nickname: {{ fighter.nickname }}</p>
                <p class="text-gray-600">Wins: {{ fighter.wins }}</p>
                <p class="text-gray-600">Losses: {{ fighter.losses }}</p>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';


// Fetch user data from the auth store
const authStore = useAuthStore();
const gamer = authStore.currentGamer;

// Get the first letter of the gamerTag
const firstLetterOfGamerTag = computed(() => {
  return gamer && gamer.gamerTag ? gamer.gamerTag.charAt(0).toUpperCase() : '';
});

const router = useRouter();
const goToFighterPage = (fighterId) => {
  router.push({ path: `/fighter/${fighterId}` });
};
</script>

<style scoped>
.upper-fold {
  border-bottom: 1px solid #e5e7eb;
}
</style>
