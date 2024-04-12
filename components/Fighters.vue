<template>
  <div class="shadow-2xl relative boxer-card-container p-6 mb-6 rounded max-w-xs bg-gray-400">

    <div class="boxer-name font-bold pb-4 text-center text-gray-700">
      <h2>{{ fighter.firstName }} {{ fighter.lastName }}</h2>
    </div>

    <!-- If fighter has a belt, display in the top right corner -->
    <div v-if="fighter.belt" class="absolute top-0.5 mt-3 right-0.5 mr-3">
      <img :src="fighter.belt" class="belt-image" />
    </div>
    
    <div class="absolute top-0.5 mt-3 left-0.5 ml-3 bg-[#0b7696] font-semibold text-gray-200 px-3 py-2 rounded-full text-sm">{{ fighter.ovr }}</div>
    
    <div class="w-54 h-60 content-center overflow-hidden">
      <div class="w-48 h-54 m-auto">
        <a :href="`/fighters/${fighter._id}`">
          <img :src="`${fighter.image}`" class="fighter-image" />
        </a>
      </div>
    </div>

    <div class="flex text-gray-700 justify-center font-bold pb-2">
      <p class="text-xl">GT: @{{ fighter.gamerTag }} </p>
    </div>    

    <div>  
      <div class="boxer-name font-bold py-2 text-center text-gray-700">
        <h3>"{{ fighter.nickname }}"</h3>
      </div>
    
      <div class="text-center record gap-1 flex justify-center font-bold text-gray-200">      
        <div class="wins bg-green-700 py-1 px-6 rounded">
          <p>{{ fighter.wins }}</p>
          <span>WINS</span>                 
        </div>
    
        <div class="losses bg-red-800 p-1 px-6 rounded">
          <p>{{ fighter.losses }}</p>
          <span>LOSSES</span>          
        </div>
    
        <div class="draws bg-[#0b7696] p-1 px-6 rounded">
          <p>{{ fighter.draws }}</p>
          <span>DRAWS</span>          
        </div>  
      </div>  
    
      <div>   
        <div class="font-semibold pt-4 justify-center record flex gap-4">
          <div class="wins text-green-700">
            <p>{{ fighter.knockouts }} <span> KO WINS</span></p>        
          </div>
          <div class="losses text-red-800">
            <p>{{ fighter.lossesByKnockout }} <span>KO LOSSES</span></p>
          </div>
        </div>
      </div>
    
      <div class="pt-4 text-center text-gray-700">
        <p class="font-semibold">{{ fighter.weightClass }}</p>
        <p>HT-{{ fighter.heightFt }}' {{ fighter.heightIn }}" RCH -{{ fighter.reach }}"</p>
      </div>
    
      <nuxt-link :to="`/fighters/${fighter._id}`"></nuxt-link>

      <a :href="`/fighters/${fighter._id}`">
        <p class="mt-3 btn2 text-center">View Fighter</p>
      </a>

    </div>
  </div>
</template>

<script setup>
  const { fighter } = defineProps(['fighter'])
</script>

<style scoped>
  .fighter-image {
    width: 100%;
    height: 200px; /* set the desired height */
    object-fit: cover;
  }

  .belt-image {
    width: 50px;  }
</style>
