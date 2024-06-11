<template>
  <div>
    <div v-if="authStore.currentGamer" class="container mx-auto py-6 px-4 px-md-4 px-lg-5 mt-2">
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
                <input type="text" placeholder="Nickname" v-model="fighter.nickname" class="bg-gray-200  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Stance Radio Button Group -->
        <div class="col-span-2">
          <FormField v-slot="{ field }" name="stance" class="mb-4">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">Stance</FormLabel>
              <FormControl>
                <div class="flex items-center space-x-4">
                  <label class="inline-flex items-center text-gray-700">
                    <input type="radio" v-model="fighter.stance" value="southpaw" class="form-radio h-4 w-4 text-gray-700">
                    <span class="ml-2">Southpaw</span>
                  </label>
                  <label class="inline-flex items-center text-gray-700">
                    <input type="radio" v-model="fighter.stance" value="orthodox" class="form-radio h-4 w-4 text-gray-700">
                    <span class="ml-2">Orthodox</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Overall Level Dropdown -->
        <div class="col-span-2">
          <FormField v-slot="{ field }" name="overallLvl" class="mb-4">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">Overall Level</FormLabel>
              <FormControl>
                <select v-model="fighter.ovr" class="rounded-sm p-1 bg-slate-500 w-1/4">
                  <option v-for="level in overallLevels" :key="level" :value="level">
                    {{ level }}
                  </option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Natural Weight Division Radio Group -->
        <div class="col-span-2">
          <FormField v-slot="{ field }" name="naturalWeightDivision" class="mb-4">
            <FormItem>
              <FormLabel class="block text-gray-700 text-sm font-bold">Natural Weight Division</FormLabel>
              <FormControl>
                <div class="grid grid-cols-2 gap-2">
                  <label v-for="division in weightDivisions" :key="division.value" class="flex items-center">
                    <input type="radio" v-model="fighter.naturalWeightDivision" :value="division.value" class="mr-2">
                    <span class="text-gray-600 font-bold text-sm mr-2">{{ division.label }}</span> ({{ division.range }})
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

        <!-- Height Slider -->
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from "~/stores/authStore.js";
// 
const authStore = useAuthStore();

const fighter = ref({
  firstName: '',
  lastName: '',
  nickname: '',
  stance: '',
  ovr: 78,
  naturalWeightDivision: '',
  reach: 50, // initial reach value
  heightValue: 64, // initial height value  
});
const minHeight = ref(64);
const maxHeight = ref(80);
const maxReach = ref(86);

// Weight division options
const weightDivisions = [
  { value: '100-112: Fly', label: 'Fly', range: '100-112' },
  { value: '112-118: Bantam', label: 'Bantam', range: '112-118' },
  { value: '118-126: Feather', label: 'Feather', range: '118-126' },
  { value: '126-135: Light', label: 'Light', range: '126-135' },
  { value: '135-147: Welter', label: 'Welter', range: '135-147' },
  { value: '147-160: Middle', label: 'Middle', range: '147-160' },
  { value: '160-175: Light Heavy', label: 'L Heavy', range: '160-175' },
  { value: '200-260: Heavy', label: 'Heavy', range: '200-260' }
];

// Overall Levels
const overallLevels = computed(() => Array.from({ length: 91 - 78 + 1 }, (_, i) => 78 + i));

watch(fighter, (newVal) => {
  // Update max reach and max height based on selected weight division
  const division = weightDivisions.find(div => div.value === newVal.naturalWeightDivision);
  if (division) {
    const [minRange, maxRange] = division.range.split('-');
    maxReach.value = Math.min(86, Number(maxRange) + 5);
    maxHeight.value = Math.min(80, Number(maxRange) + 3); // Assuming average increase in height
  }

  // Reset reach if it exceeds the new maxReach
  if (newVal.reach > maxReach.value) {
    newVal.reach = maxReach.value;
  }
  // Reset height if it exceeds the new maxHeight
  if (newVal.heightValue > maxHeight.value) {
    newVal.heightValue = maxHeight.value;
  }
}, { deep: true });

watch(() => fighter.value.heightValue, (newVal) => {
  // Ensure heightValue stays within the allowed range
  if (newVal < minHeight.value) {
    fighter.value.heightValue = minHeight.value;
  } else if (newVal > maxHeight.value) {
    fighter.value.heightValue = maxHeight.value;
  }
});

const feet = computed(() => Math.floor(fighter.value.heightValue / 12));
const inches = computed(() => fighter.value.heightValue % 12);

const onSubmit = async () => {
  const data = {
    ...fighter.value
  };

  try {
    // Make an HTTP POST request to the backend API endpoint
    const response = await fetch('http://localhost:5550/api/v1/fighter/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Assuming you have a token in your authStore for authentication
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(data) // Send the data object as JSON string
    });

    // Check if the request was successful
    if (response.ok) {
      // Reset the form or perform any other necessary actions upon successful submission
      console.log('Fighter registered successfully!');
    } else {
      // If the request failed, parse and log the error response
      const errorData = await response.json();
      console.error('Error:', errorData.message || 'An error occurred while registering the fighter.');
    }
  } catch (error) {
    // If an exception occurs during the request, handle it and log the error
    console.error('An error occurred:', error);
  }
};


</script>




