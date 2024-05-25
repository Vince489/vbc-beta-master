<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <form @submit.prevent="onSubmit" class="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- First Name and Last Name side by side -->
      <div class="col-span-2 md:col-span-1 flex">
        <!-- First Name -->
        <div class="w-1/2 mr-2">
          <FormField v-slot="{ field }" name="firstName" class="mb-4">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">First Name</FormLabel>
              <FormControl>
                <input type="text" placeholder="First Name" v-model="fighter.firstName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                <input type="text" placeholder="Last Name" v-model="fighter.lastName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
              <input type="text" placeholder="Nickname" v-model="fighter.singleInput" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      
      <div>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="stance">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">Stance</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="southpaw">
                    Southpaw
                  </SelectItem>
                  <SelectItem value="orthodox">
                    Orthodox
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your preferred fighting stance.
              </FormDescription>
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
                  <span class="text-black font-bold text-sm mr-2">Fly</span> (100-112)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="112-118: Bantam" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">Bantam</span> (112-118)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="118-126: Feather" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">Feather</span> (118-126)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="126-135: Light" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">Light</span> (126-135)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="135-147: Welter" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">Welter</span> (135-147)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="147-160: Middle" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">Middle</span> (147-160)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="160-175: Light Heavy" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">L Heavy</span> (160-175)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.weightDivision" value="200-260: Heavy" class="mr-2">
                  <span class="text-black font-bold text-sm mr-2">Heavy</span> (200-260)
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
              <input type="range" v-model="fighter.reach" :max="maxReach" min="61" class="w-full">
              <div class="text-gray-700 text-sm mt-2">
                <span>Reach value: {{ fighter.reach }}</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Height Input -->
      <!-- Height Input -->
      <div class="col-span-2">
          <FormField v-slot="{ field }" name="height" class="mb-4">
              <FormItem>
                  <FormLabel class="block text-gray-700 text-sm font-bold">Height</FormLabel>
                  <FormControl>
                      <div class="flex">
                          <!-- Feet Dropdown -->
                          <Select v-model="fighter.height.feet" >
                              <SelectTrigger>
                                  <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <!-- Add more options as needed -->
                              </SelectContent>
                          </Select>
                          <span class="text-gray-700 font-bold">ft</span>
                          <!-- Inches Dropdown -->
                          <Select v-model="fighter.height.inches" class="w-1/2 ml-2">
                              <SelectTrigger>
                                  <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="0">0</SelectItem>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value="7">7</SelectItem>
                                  <SelectItem value="8">8</SelectItem>
                                  <SelectItem value="9">9</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                  <SelectItem value="11">11</SelectItem>
                                  <!-- Add more options as needed -->
                              </SelectContent>
                          </Select>
                          <span class="text-gray-700 font-bold">in</span>
                      </div>
                  </FormControl>
                  <FormMessage />
              </FormItem>
          </FormField>
      </div>

      <!-- Submit Button -->
      <div class="col-span-2 flex justify-center">
        <Button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </Button>
      </div>
    </form>
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
        height: {
          feet: '', // default value for feet
          inches: '' // default value for inches
        }
      },
      maxReach: 91 // default max reach value
    }
  },
  watch: {
  'fighter.weightDivision'(newVal) {
    if (newVal === '100-112: Fly') {
      this.maxReach = 64;
    } else if (newVal === '112-118: Bantam') {
      this.maxReach = 66;
    } else if (newVal === '118-126: Feather') {
      this.maxReach = 68;
    } else if (newVal === '126-135: Light') {
      this.maxReach = 70;
    } else if (newVal === '135-147: Welter') {
      this.maxReach = 72;
    } else if (newVal === '147-160: Middle') {
      this.maxReach = 74;
    } else if (newVal === '160-175: Light Heavy') {
      this.maxReach = 82;
    } else {
      this.maxReach = 86; // Reset to default max reach for other divisions
    }
    // Reset reach if it's beyond the new maxReach
    if (this.fighter.reach > this.maxReach) {
      this.fighter.reach = this.maxReach;
    }
  }
},
  methods: {
    onSubmit() {
      console.log('Form submitted with data:', this.fighter);
    }
  }
}
</script>

<style scoped>
/* Add custom styles here */
</style>
