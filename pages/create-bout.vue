<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <CreateBoutForm @create-bout="createBout" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Define the method to create a bout
const createBout = async (boutData) => {
  try {
    const response = await fetch('http://localhost:5550/api/v1/bout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boutData),
      credentials: 'include', // This includes cookies in the request
    });

    const data = await response.json(); // Read the response data only once

    if (response.ok) {
      console.log('Bout created successfully:', data);
      router.push('/bouts'); // Redirect to bouts page after successful creation
    } else {
      console.error(`Failed to create bout: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error creating bout:', error);
  }
};


</script>

<style>
/* Global styles */
</style>
