<template>
  <div>
    <Navbar />
  </div>

  <div class="bg-gray-800 text-gray-200">
    <slot />

    <Footer />
    <LowerNav /> <!-- Add the LowerNav component here -->
  </div>
</template>

