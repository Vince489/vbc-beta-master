<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <!-- Loop over projects and render a card for each -->
    <div v-for="project in projects" :key="project.id">
      <Card class="w-[350px]">
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
  </div>
</template>



<script setup>
import { useAuthStore } from '~/stores/authStore.js';
import { onMounted, ref } from 'vue';

definePageMeta({
  title: 'Dashboard',
  description: 'User dashboard page',
  middleware: 'auth'
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
