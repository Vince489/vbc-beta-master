<template>
  <div v-if="!isAuthenticated" class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <form @submit.prevent="onSubmit" class="bg-gray-400 shadow-md rounded px-4 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- First Name and Last Name side by side -->
      <div class="col-span-2 md:col-span-1 flex">
        <!-- First Name -->
        <div class="w-1/2 mr-2">
          <FormField v-slot="{ field }" name="firstName" class="mb-4">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">First Name</FormLabel>
              <FormControl>
                <input type="text" placeholder="First Name" v-model="fighter.firstName" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <!-- Last Name -->
        <div class="w-1/2 ml-2">
          <FormField v-slot="{ field }" name="lastName" class="mb-4">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">Last Name</FormLabel>
              <FormControl>
                <input type="text" placeholder="Last Name" v-model="fighter.lastName" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
      <!-- Single input section -->
      <div class="col-span-2">
        <FormField v-slot="{ field }" name="singleInput" class="mb-4">
          <FormItem>
            <FormLabel class="block text-gray-700 text-sm font-bold">Nickname</FormLabel>
            <FormControl>
              <input type="text" placeholder="Nickname" v-model="fighter.singleInput" class="bg-gray-200  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      
      <div>
<form @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="stance">
        <FormItem>
          <FormLabel class="text-gray-700 block text-sm font-bold">Stance</FormLabel>
          <div class="flex items-center space-x-4">
            <!-- Southpaw Radio Button -->
            <label class="inline-flex items-center text-gray-700">
              <input type="radio" v-model="fighter.stance" value="southpaw" class="form-radio h-4 w-4 text-gray-700">
              <span class="ml-2">Southpaw</span>
            </label>
            <!-- Orthodox Radio Button -->
            <label class="inline-flex items-center text-gray-700">
              <input type="radio" v-model="fighter.stance" value="orthodox" class="form-radio h-4 w-4 text-gray-700">
              <span class="ml-2">Orthodox</span>
            </label>
          </div>
          <FormMessage />
        </FormItem>
      </FormField>
    </form>
  </div>
      
      <!-- Weight Division Radio Group -->
      <div class="col-span-2">
        <FormField v-slot="{ field }" name="weightDivision" class="mb-4">
          <FormItem>
            <FormLabel class="block text-gray-700 text-sm font-bold">Natural Weight Division</FormLabel>
            <FormControl>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="100-112: Fly" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Fly</span> (100-112)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="112-118: Bantam" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Bantam</span> (112-118)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="118-126: Feather" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Feather</span> (118-126)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="126-135: Light" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Light</span> (126-135)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="135-147: Welter" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Welter</span> (135-147)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="147-160: Middle" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Middle</span> (147-160)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="160-175: Light Heavy" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">L Heavy</span> (160-175)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="200-260: Heavy" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Heavy</span> (200-260)
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <!-- Reach Slider -->
      <div class="col-span-2">
        <FormField v-slot="{ field }" name="reach" class="mb-4">
          <FormItem>
            <FormLabel class="block text-gray-700 text-sm font-bold">Reach</FormLabel>
            <FormControl>
              <input type="range" v-model="fighter.reach" :max="maxReach" min="61" class="semibold w-full">
              <div class="font-semibold text-gray-700 text-sm mt-2">
                <span>Reach value: {{ fighter.reach }}</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-2">
        <FormField v-slot="{ field }" name="height" class="mb-4">
          <FormItem>
            <FormLabel class="block text-gray-700 text-sm font-bold">Height</FormLabel>
            <FormControl>
              <input type="range" v-model="fighter.heightValue" :min="minHeight" :max="maxHeight" class="w-full" />
              <div class="flex justify-between text-gray-700 text-sm font-semibold mt-2">
                <span>Height value: {{ feet }} ft {{ inches }} in</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Submit Button -->
      <div class="col-span-2 flex justify-center">
        <Button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register Fighter
        </Button>
      </div>
    </form>
  </div>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2" v-else>
    <div>
      <p>Please <nuxt-link to="/login">login</nuxt-link> to register.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fighter: {
        firstName: '',
        lastName: '',
        singleInput: '',
        weightDivision: '',
        reach: 50, // initial reach value
        heightValue: 64, // initial height value  
    },
    minHeight: 64,
    maxHeight: 80,
  }
},
watch: {
    'fighter.weightDivision'(newVal) {
      if (newVal === '100-112: Fly') {
        this.maxReach = 64;
        this.maxHeight = 66; // 5' 6"
      } else if (newVal === '112-118: Bantam') {
        this.maxReach = 66;
        this.maxHeight = 67; // 5' 7"
      } else if (newVal === '118-126: Feather') {
        this.maxReach = 68;
        this.maxHeight = 68; // 5' 8"
      } else if (newVal === '126-135: Light') {
        this.maxReach = 70;
        this.maxHeight = 69; // 5' 9"
      } else if (newVal === '135-147: Welter') {
        this.maxReach = 72;
        this.maxHeight = 71; // 5' 11"
      } else if (newVal === '147-160: Middle') {
        this.maxReach = 74;
        this.maxHeight = 72; // 6' 0"
      } else if (newVal === '160-175: Light Heavy') {
        this.maxReach = 82;
        this.maxHeight = 74; // 6' 2"
      } else {
        this.maxReach = 86; // Default max reach for other divisions
        this.maxHeight = 80; // Default max height for other divisions
      }
      // Reset reach if it's beyond the new maxReach
      if (this.fighter.reach > this.maxReach) {
        this.fighter.reach = this.maxReach;
      }
      // Reset height if it's beyond the new maxHeight
      if (this.fighter.heightValue > this.maxHeight) {
        this.fighter.heightValue = this.maxHeight;
      }
    },
    'fighter.heightValue'(newVal) {
      // Ensure heightValue stays within the allowed range
      if (newVal < this.minHeight) {
        this.fighter.heightValue = this.minHeight;
      } else if (newVal > this.maxHeight) {
        this.fighter.heightValue = this.maxHeight;
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('Form submitted with data:', this.fighter);
    }
  },
    computed: {
    feet() {
      return Math.floor(this.fighter.heightValue / 12);
    },
    inches() {
      return this.fighter.heightValue % 12;
    }
  }
}
</script>

<style scoped>
/* Add custom styles here */
</style>
