<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
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
            <nuxt-link to="/eac">Register</nuxt-link>
          </Button>
        </div>
      </div>

      <!-- Centered fighter cards -->
      <div class="flex justify-center mt-4">
        <div class="w-full max-w-4xl">
          <div class="flex flex-wrap gap-4 justify-center">
            <template v-for="fighter in gamer.fighters" :key="fighter._id">
              <Card class="border p-4 rounded shadow bg-gray-700 hover:bg-gray-500 relative w-[90%] max-w-[400px]">
                <nuxt-link :to="`/fighters/${fighter._id}`" class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img :src="fighter.image || defaultFighterImage" alt="fighter" class="w-12 h-12 rounded-full" />
                  </div>
                  <div>
                    <p class="text-lg text-gray-300 font-bold">{{ fighter.firstName }} {{ fighter.lastName }}</p>
                    <p class="text-sm text-gray-400 font-semibold">{{ fighter.weightClass }}</p>
                    <p class="text-sm text-gray-400">({{ fighter.wins }}-{{ fighter.losses }}-{{ fighter.draws }})</p>
                  </div>
                </nuxt-link>
                <div class="absolute top-0 right-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button class="dots-button">•••</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <!-- <DropdownMenuItem @click="deleteFighter(fighter._id)">Delete Fighter</DropdownMenuItem> -->
                      <DropdownMenuItem @click="retireFighter(fighter._id)">Retire Fighter</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>



<script setup>
import { useAuthStore } from '@/stores/authStore'; 

// Fetch user data from the auth store
const authStore = useAuthStore();
const gamer = authStore.currentGamer;

//  Get the first letter of the gamerTag
const firstLetterOfGamerTag = gamer && gamer.gamerTag ? gamer.gamerTag.charAt(0).toUpperCase() : '';

// Default fighter image
const defaultFighterImage = '/path/to/default-fighter-image.jpg'; // Replace with your default image path

function deleteFighter(fighterId) {
  // Assuming the token is stored in authStore.token
  const token = authStore.token;

  fetch(`https://vbc-login-production.up.railway.app/api/v1/fighter/delete/${fighterId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      // Handle successful deletion
      console.log(data.message);
      // Remove the fighter from the local state or refetch data
      authStore.currentGamer.fighters = authStore.currentGamer.fighters.filter(fighter => fighter._id !== fighterId);
    } else {
      // Handle error
      console.error(data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

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
  padding: 0.25rem;
}
</style>
