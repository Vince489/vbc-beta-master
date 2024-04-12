<template>
  <div class="container px-4 py-8 md:p-8 pt-18 flex flex-col md:flex-row justify-between items-center">
    <h1 class="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">All Fighters</h1>
    <div class="flex flex-col md:flex-row items-center w-full md:w-auto">
      <div class="w-full md:w-64 flex justify-between items-center pr-4 mb-4 md:mb-0">
        <input type="text" class="border border-gray-300 text-gray-800 rounded-md py-2 px-4 w-full" placeholder="Search fighters...">
      </div>
      <div class="relative w-full md:w-auto text-gray-800">
        <select v-model="selectedWeightClass"
          class="border border-gray-300 rounded-md py-2 px-4 appearance-none w-full md:w-auto">
          <!-- Options -->
          <option value="">Weight Class</option>
          <option value="Super Featherweight">Super Featherweight (126-130 lbs)</option>
          <option value="Lightweight">Lightweight (130–135 lbs)</option>
          <option value="Super Lightweight">Super Lightweight (135–140 lbs)</option>
          <option value="Welterweight">Welterweight (140–147 lbs)</option>
          <option value="Super Welterweight">Super Welterweight (147–154 lbs)</option>
          <option value="Middleweight">Middleweight (154–160 lbs)</option>
          <option value="Super Middleweight">Super Middleweight (160–168 lbs)</option>
          <option value="Light Heavyweight">Light Heavyweight (168–175 lbs)</option>
          <option value="Cruiserweight">Cruiserweight (175–200 lbs)</option>
          <option value="Heavyweight">Heavyweight (200+ lbs)</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4 transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <!-- SVG Path -->
            <path
              d="M14.95 7.95a.999.999 0 1 0-1.41-1.41l-3.54 3.54a.999.999 0 0 0 0 1.41l3.54 3.54a.999.999 0 1 0 1.41-1.41L11.41 10l3.54-3.54z" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="container px-4 mt-10 justify-center gap-6 flex flex-wrap">
    <!-- Fighters loop -->
    <div v-for="fighter in filteredFighters" :key="fighter._id">
      <Fighters :fighter="fighter" />
    </div>

    <!-- No fighters message -->
    <div v-if="showNoFightersMessage" class="text-center text-gray-600 mt-4">
      No fighters in this weight class.
    </div>
  </div>
</template>


<script>
import Fighters from '@/components/Fighters.vue'

export default {
  data() {
    return {
      selectedWeightClass: '',
      fighters: [],
      showNoFightersMessage: false // Added showNoFightersMessage property
    }
  },
  computed: {
    filteredFighters() {
      const filtered = this.selectedWeightClass === ''
        ? this.fighters
        : this.fighters.filter(fighter => fighter.weightClass === this.selectedWeightClass);

      this.showNoFightersMessage = filtered.length === 0; // Set showNoFightersMessage based on filtered array length

      return filtered;
    }
  },
  components: {
    Fighters
  },
  mounted() {
    this.fetchFighters()
  },
  methods: {
    async fetchFighters() {
      try {
        const response = await fetch('https://virtron-production.up.railway.app/fighters')
        const data = await response.json()
        this.fighters = data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
