<template>
  <aside class="bg-gray-800 text-white w-64 h-full p-4">
    <h1 class="text-2xl font-bold mb-4">ChatGPT</h1>
    <nav>
      <ul>
        <li v-for="(item, index) in navItems" :key="index" class="mb-2">
          <a href="#" class="block p-2 rounded hover:bg-gray-700">{{ item }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const navItems = ['Greeting and Response', 'Settings', 'About']
</script>
