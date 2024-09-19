<template>
  <div>
    <Navbar />
  </div>

  <div class="bg-gray-800 text-gray-200">
    <slot />

    <Footer />
    <LowerNav class="block md:hidden"/> 
  </div>
</template>

