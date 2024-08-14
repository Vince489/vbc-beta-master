<template>
  <div class="bg-gray-100">
    <!-- Header Section -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <div class="text-xl font-bold">Header Title</div>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <nuxt-link to="#" class="text-gray-700 hover:text-gray-900">Link 1</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="text-gray-700 hover:text-gray-900">Link 2</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="text-gray-700 hover:text-gray-900">Link 3</nuxt-link>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-4">Main Content Title</h1>
        <p class="text-gray-700 mb-4">
          Here is some sample text for the main content area. Use Tailwind utility classes for styling.
        </p>
        <!-- Example Button -->
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Click Me</button>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-white shadow p-4 mt-6">
      <p class="text-center text-gray-600">© 2024 Your Company</p>
    </footer>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Recreated Layout",
    };
  },
};
</script>

<style>
/* Add any custom styles here if necessary */
</style>
