<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <!-- Conditional rendering based on gamer data -->
    <template v-if="gamerLoading">
      <p class="text-center">Loading...</p>
    </template>
    <template v-else>
      <div class="pb-3 upper-fold pt-4 grid grid-cols-2">
        <div>
          <Avatar class="w-20 h-20">
            <AvatarImage :src="gamer.image" alt="fight" />
            <AvatarFallback class="text-4xl">{{ firstLetterOfGamerTag }}</AvatarFallback>
          </Avatar>
          <p class="pt-1 text-sm text-cyan-600 font-semibold font-mono tracking-wide">@{{ gamer.gamerTag }}</p>
        </div>
        <div class="flex flex-col justify-end items-end">
          <div class="flex items-center text-gray-300 text-4xl font-bold mb-2 p-4">
            <p>{{ gamer.account && gamer.account.vrtAccount ? (gamer.account.vrtAccount.balance / 100).toFixed(2) : '0.00' }}</p>
            <span class="ml-2 text-xl">VRT</span>
          </div>
          <Button class="bg-cyan-800 hover:bg-cyan-600 font-semibold px-3 text-lg text-gray-100 w-full">
            <nuxt-link to="/eac">Register</nuxt-link>
          </Button>
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <div class="w-full max-w-4xl">
          <div class="flex flex-wrap gap-4 justify-center">
            <template v-for="fighter in gamer.fighters" :key="fighter._id">
              <Card class="border p-4 rounded shadow bg-gray-700 hover:bg-gray-500 relative w-full max-w-[400px]">
                <nuxt-link :to="`/fighters/${fighter._id}`" class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img :src="fighter.image" alt="fighter" class="w-12 h-12 rounded-full" />
                  </div>
                  <div>
                    <p class="text-lg text-gray-300 font-bold">{{ fighter.firstName }} {{ fighter.lastName }}</p>
                    <p class="text-sm text-gray-400 font-semibold">{{ fighter.weightClass }}</p>
                    <p class="text-sm text-gray-400">({{ fighter.wins }}-{{ fighter.losses }}-{{ fighter.draws }})</p>
                    <p class="text-sm text-gray-400">ID# {{ fighter._id }}</p>
                  </div>
                </nuxt-link>
                <div class="absolute top-0 right-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button class="dots-button">•••</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem @click="">Legacy</DropdownMenuItem>
                      <DropdownMenuItem @click="retireFighter(fighter._id)">Retire Fighter</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            </template>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <Card v-if="gamer.managerRole" class="border p-4 rounded shadow bg-gray-800 w-full max-w-[400px]">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img :src="gamer.managerRole.image || gamer.image" alt="manager" class="w-12 h-12 rounded-full" />
            </div>
            <div>
              <p class="text-lg text-gray-300 font-bold">{{ gamer.managerRole.firstName }} {{ gamer.managerRole.lastName }}</p>
              <p class="text-sm text-gray-400 font-semibold">Manager</p>
              <p class="text-sm text-gray-400">Earnings: ${{ gamer.managerRole.earnings }}</p>
              <p class="text-sm text-gray-400">ID# {{ gamer.managerRole._id }}</p>

            </div>
          </div>
        </Card>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const gamer = ref(null);
const gamerLoading = ref(true);

// Fetch gamer data on component mount
onMounted(async () => {
  gamerLoading.value = true;
  try {
    await authStore.fetchGamerData();
    gamer.value = authStore.currentGamer;
  } catch (error) {
    console.error('Error fetching gamer data:', error.message);
  } finally {
    gamerLoading.value = false;
  }
});

// Get the first letter of the gamerTag
const firstLetterOfGamerTag = computed(() => gamer.value?.gamerTag.charAt(0).toUpperCase() || '');

function retireFighter(fighterId) {
  // Logic for retiring the fighter
}
</script>

<style scoped>
.dots-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  padding: 1rem;
}
</style>
