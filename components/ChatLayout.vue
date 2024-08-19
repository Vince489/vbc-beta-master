<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <header class="p-4 bg-blue-600 text-white">
      <h1 class="text-xl">Chat App</h1>
    </header>
    <main class="flex-1 p-4 overflow-y-auto">
      <slot></slot>
    </main>
    <footer class="p-4 bg-gray-200">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
