<template>
  <div class="flex h-screen bg-gray-200">
    <!-- Sidebar -->
    <div :class="{ 'sidebar': true, 'closed': sidebarClosed }" class="bg-gray-800 text-white">
      <!-- Sidebar content -->
      <div class="p-4">
        <h1 class="text-lg font-semibold">Logo</h1>
        <ul class="mt-4">
          <li v-for="(item, index) in sidebarItems" :key="index">
            <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:text-white">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Your icon -->
              </svg>
              <span>{{ item }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1">
      <!-- Toggle button -->
      <button @click="toggleSidebar" class="bg-gray-800 text-white p-2 m-4 rounded-md">
        <!-- Icon for the toggle button -->
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path v-if="sidebarClosed" fill-rule="evenodd" clip-rule="evenodd" d="M5 4.75C5 4.33579 5.33579 4 5.75 4H18.25C18.6642 4 19 4.33579 19 4.75C19 5.16421 18.6642 5.5 18.25 5.5H5.75C5.33579 5.5 5 5.16421 5 4.75ZM5.75 8C5.33579 8 5 8.33579 5 8.75C5 9.16421 5.33579 9.5 5.75 9.5H18.25C18.6642 9.5 19 9.16421 19 8.75C19 8.33579 18.6642 8 18.25 8H5.75ZM5.75 14C5.33579 14 5 14.3358 5 14.75C5 15.1642 5.33579 15.5 5.75 15.5H18.25C18.6642 15.5 19 15.1642 19 14.75C19 14.3358 18.6642 14 18.25 14H5.75Z" fill="currentColor"/>
          <path v-else fill-rule="evenodd" clip-rule="evenodd" d="M8.25 19C7.83579 19 7.5 18.6642 7.5 18.25C7.5 17.8358 7.83579 17.5 8.25 17.5H19.75C20.1642 17.5 20.5 17.8358 20.5 18.25C20.5 18.6642 20.1642 19 19.75 19H8.25ZM4.75 14.75C4.75 15.1642 4.41421 15.5 4 15.5C3.58579 15.5 3.25 15.1642 3.25 14.75C3.25 14.3358 3.58579 14 4 14C4.41421 14 4.75 14.3358 4.75 14.75ZM4 10.25C4.41421 10.25 4.75 9.91421 4.75 9.5C4.75 9.08579 4.41421 8.75 4 8.75C3.58579 8.75 3.25 9.08579 3.25 9.5C3.25 9.91421 3.58579 10.25 4 10.25ZM8.25 5.5C7.83579 5.5 7.5 5.16421 7.5 4.75C7.5 4.33579 7.83579 4 8.25 4H19.75C20.1642 4 20.5 4.33579 20.5 4.75C20.5 5.16421 20.1642 5.5 19.75 5.5H8.25Z" fill="currentColor"/>
        </svg>
      </button>

      <!-- Main content here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarClosed: false,
      sidebarItems: ['Dashboard', 'Profile', 'Settings'] // Add more sidebar items as needed
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarClosed = !this.sidebarClosed;
    }
  }
}
</script>

<style scoped>
/* Additional custom styling */
.sidebar {
  width: 200px; /* Initial width of the sidebar */
  transition: width 0.3s ease;
}

.sidebar.closed {
  width: 60px; /* Width when collapsed */
}
</style>
