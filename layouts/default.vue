<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="flex-grow pt-16 bg-gray-700 text-gray-200">
      <slot />
    </div>
    <Footer />
    <LowerNav /> <!-- Add the LowerNav component here -->
  </div>
</template>