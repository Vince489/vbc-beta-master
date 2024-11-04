<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <div class="flex-grow pt-16 bg-gray-800 text-gray-200">
      <slot />
    </div>
    <Footer />
    <LowerNav class="block md:hidden"/> 
  </div>
</template>