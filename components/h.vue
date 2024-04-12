<template>
  <section class="relative h-screen">
    <div class="overflow-hidden">
      <img class="absolute inset-0 h-full w-full object-cover" src="/img/lee-ko.png" alt="hero image">
    </div>

    <div class="overlay absolute inset-0 bg-black opacity-40"></div>

    <div class="container pt-56 mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-24"> <!-- Adjusted margin and added padding -->
      <div class="flex justify-start"> <!-- Changed justify-center to justify-start -->
        <div class="lg:w-1/2 text-center relative"> <!-- Changed lg:w-2/3 to lg:w-1/2 -->
          <div class="space-y-6 mb-10">
            <h2 class="text-gray-100 text-6xl lg:text-8xl leading-tight capitalize font-semibold">
              SIM BOXING LEAGUE
            </h2>
            <p class="text-gray-100 text-3xl font-semibold">
              Don't leave it to the judges.
            </p>
            <p class="text-gray-100 text-lg">
              Professional (NO HUD) Boxing.
            </p>
            <button class="btn">
              Join Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
