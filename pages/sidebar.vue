<template>
  <div class="sidebar">
    <!-- Sidebar toggle button -->
    <button @click="toggleSidebar" class="sidebar-toggle">Toggle Sidebar</button>
    
    <!-- Sidebar content -->
    <div :class="{ 'hidden': !isOpen }" class="sidebar-content">
      <!-- Your sidebar content goes here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true // Initially open
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.sidebar {
  @apply bg-gray-600 text-white h-screen w-64 fixed top-0 left-0 z-50 overflow-y-auto transition-all duration-300 ease-in-out;
}

.sidebar-content {
  @apply p-4;
}

.sidebar-toggle {
  @apply block md:hidden bg-gray-600 text-white py-2 px-4 w-full text-left;
}
</style>
