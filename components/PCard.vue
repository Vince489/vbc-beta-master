<template>
  <div class="bg-blue-100 rounded-xl shadow-md p-4 text-center max-w-xs mx-auto relative min-w-[300px]">
    <div class="max-w-xs w-full mx-auto relative">

      <!-- Top white box with logo and title -->
      <div class="bg-white rounded-lg pt-2 pb-20 text-center relative">
        <img :src="logo" alt="Logo" class="mx-auto mb-2 w-16" />
        <h2 class="text-lg font-bold">{{ name }}</h2>
      </div>

      <!-- Profile photo centered over both boxes -->
      <img 
        :src="photo" 
        alt="Profile Photo" 
        class="rounded-full w-32 h-32 mx-auto absolute top-24 left-1/2 transform -translate-x-1/2 border-4 border-white shadow-lg z-10" 
      />

      <!-- Bottom white box with title and description -->
      <div class="bg-white rounded-lg p-4 text-center mt-4 pt-16 relative">
        <p class="text-gray-500 text-sm">{{ title }}</p>
        <p class="text-gray-700 text-xs mt-2">{{ description }}</p>
      </div>

      <!-- Contact Buttons -->
      <div class="mt-6 space-y-2">
        <button v-if="callLink" @click="navigate(callLink)" class="btn flex items-center justify-start">
          <Icon class="text-gray-400" size="20" name="majesticons:phone" />
          <span class="flex-1 text-center">Call me</span>
        </button>
        <button v-if="emailLink" @click="navigate(emailLink)" class="btn flex items-center justify-start">
          <Icon class="text-gray-400" size="20" name="majesticons:mail-line" />
          <span class="flex-1 text-center">Email</span>
        </button>
        <button v-if="instagramLink" @click="navigate(instagramLink)" class="btn flex items-center justify-start">
          <Icon class="text-gray-400" size="20" name="il:instagram" />
          <span class="flex-1 text-center">Instagram</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  logo: String,
  photo: String,
  name: String,
  title: String,
  description: String,
  callLink: String,
  emailLink: String,
  instagramLink: String,
});

const navigate = (link) => {
  window.open(link, "_blank");
};
</script>


<style scoped>
.btn {
  @apply w-full py-2 px-4 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-300 transition;
}
</style>
