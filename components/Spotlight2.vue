<template>
  <div>
    <div class="flex justify-center">
      <div class="flex flex-col max-w-6xl lg:flex-row p-4 pb-6 mx-auto">
        <div class="lg:w-1/2">
          <div class="spotlight-image-container rounded-t-xl lg:rounded-none lg:rounded-l-xl">
            <img class="spotlight-image" src="/img/chieffa2.png" alt="">
          </div>
        </div>     

        <div class="spotlightTwo lg:w-1/2 bg-gray-600 text-gray-300 rounded-b-xl lg:rounded-none lg:rounded-r-xl">
          <div class="p-10">        
            <h2 class="pb-5 text-2xl"> Chieffa Ali</h2>
            <h3 class="pb-3">XBOX - Metabox Promotions</h3>
            <p class="pb-5">Super Middleweight Champion defends his title vs OWC opponent Michael Morgan.</p>
            <a href="https://youtu.be/Zer3q3QFo4s?si=ndvezOE38HoZWgbK" target="_blank" rel="noopener noreferrer">
            <button class="px-4 py-2 rounded-full bg-[#0b7696] text-gray-300">FULL FIGHT</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .justify-center {
    display: grid; /* Use CSS Grid */
    grid-template-columns: 1fr; /* Create a single column layout by default */
    align-items: stretch; /* Make grid items span the full height of the container */
  }

  @media (min-width: 768px) {
    .justify-center {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Switch to a multi-column layout for larger screens */
    }
  }

  .spotlight-image-container {
    width: 100%;
    height: 100%; /* Ensure the container takes up the full height of its parent */
    overflow: hidden; /* Hide any overflow to prevent the image from exceeding the container */
  }

  .spotlight-image {
    width: 100%;
    height: 100%; /* Ensure the image covers the entire container */
    object-fit: cover; /* Maintain aspect ratio and cover the container */
  }
</style>