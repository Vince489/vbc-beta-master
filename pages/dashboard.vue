<template>
  <!-- Container for the entire page -->
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <div>
      <!-- Use a conditional rendering to show loading text while userData is null -->
      <template v-if="!userData">
        <p>Loading...</p>
      </template>
      <!-- Once userData is available, display user's information -->
      <template class="flex items-center" v-else>
        <div class="pt-4 cursor-pointer hover:cursor-pointer">
          <img class="rounded-lg" src="/assets/img/free.png" alt="free tokens">
        </div>

        <div class="flex items-center gap-4 pt-6">
          <Avatar class="h-16 w-16 flex-shrink-0">
            <AvatarImage src="/img/chieffa.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h1 class="text-2xl font-bold">{{ userData.userName }}</h1>
            <p class="text-gray-500">{{ userData.email }}</p>
          </div>
        </div>

        <div class="pt-6">
          <h2 class="text-xl font-bold">Account Summary</h2>
          <div class="border my-2 rounded-md p-4 ">
            <p class="text-gray-500">Private Key: {{ userData.accountType }}</p>
            <p class="text-gray-500">Balance: {{ userData.account }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  title: 'Dashboard',
  description: 'User dashboard page'
});
import {useAuthStore} from "~/stores/authStore.js";
import { onMounted, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

definePageMeta({
  middleware: 'auth',
  title: 'Dashboard',
  description: 'User dashboard page'
});

// Get the user's information from the store
const authStore = useAuthStore()
const userData = ref(null); // Use a ref to make it reactive

// Fetch the user's data when the component is mounted
onMounted(() => {
  userData.value = authStore.currentUser
});
</script>

<style scoped>

</style>
