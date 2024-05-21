<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <div>
      <!-- Use a conditional rendering to show loading text while userData is null -->
      <template v-if="!userData">
        <p>Loading...</p>
      </template>
      <!-- Once userData is available, display user's information -->
      <template v-else>
        <div class="pt-4 cursor-pointer hover:cursor-pointer">
          <!-- "Free tokens" image -->
          <img class="rounded-lg" src="/assets/img/free.png" alt="free tokens">
        </div>

        <div>
          <!-- Additional user information can be added here -->
        </div>

        <!-- Dialog modal -->
        <Dialog>
    <DialogTrigger>
      <div class="flex items-center gap-4 pt-6">
        <!-- Avatar component with tooltip -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div>
                <button @click="openDialog" class="rounded-lg">
                  <Avatar class="h-16 w-16 flex-shrink-0">
                    <AvatarImage src="/img/chieffa.png" alt="@radix-vue" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent class="text-gray-200 bg-slate-600">
              <p>Change profile photo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <!-- User information -->
        <div>
          <h1 class="text-2xl font-bold">{{ userData.userName }}</h1>
          <p class="text-gray-500">{{ userData.email }}</p>
        </div>
      </div>
    </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              Save changes
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <!-- Centered and responsive Card component -->
        <div class="flex justify-center">
          <Card class="w-full md:w-[350px]">
            <CardHeader v-if="project">
              <CardTitle>{{ project.name }}</CardTitle>
              <CardDescription>{{ project.description }}</CardDescription>
            </CardHeader>
            <CardContent v-if="project">
              <p>Additional project details can go here...</p>
            </CardContent>
            <CardFooter v-if="project" class="flex justify-between px-6 pb-6">
              <Button variant="outline" @click="cancelProject(project.id)">
                Cancel
              </Button>
              <Button @click="deployProject(project.id)">Deploy</Button>
            </CardFooter>
          </Card>
        </div>
        <!-- End of centered and responsive Card component -->

        <!-- Loop over projects and render a card for each -->
        <div v-for="project in projects" :key="project.id">
          <Card v-if="project" class="w-[350px]">
            <CardHeader>
              <CardTitle>{{ project.name }}</CardTitle>
              <CardDescription>{{ project.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Additional project details can go here...</p>
            </CardContent>
            <CardFooter class="flex justify-between px-6 pb-6">
              <Button variant="outline" @click="cancelProject(project.id)">
                Cancel
              </Button>
              <Button @click="deployProject(project.id)">Deploy</Button>
            </CardFooter>
          </Card>
        </div>        
        <div class="pt-6">
          <h2 class="text-xl font-bold">Account Summary</h2>
          <div class="border my-2 rounded-md p-4">
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

import { useAuthStore } from '~/stores/authStore.js';
import { onMounted, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

definePageMeta({
  middleware: 'auth',
  title: 'Dashboard',
  description: 'User dashboard page'
});

// Get the user's information from the store
const authStore = useAuthStore();
const userData = ref(null); // Use a ref to make it reactive

// Fetch the user's data when the component is mounted
onMounted(() => {
  userData.value = authStore.currentUser;
});

// Sample projects data (replace with data from your database)
const projects = ref([
  { id: 1, name: 'Project 1', description: 'Description of Project 1' },
  { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  // Add more project objects as needed
]);

// Function to handle cancel action
const cancelProject = (projectId) => {
  // Logic to cancel the project (e.g., remove from the database)
};

// Function to handle deploy action
const deployProject = (projectId) => {
  // Logic to deploy the project (e.g., trigger deployment process)
};
</script>

<style scoped>
</style>