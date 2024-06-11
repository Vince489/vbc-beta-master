<template>
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
      <!-- Overall LVL -->
      <div class="col-span-2">
        <FormField v-slot="{ field }" name="overallLvl" class="mb-4">
          <FormItem>
                  <FormLabel class="block text-gray-700 text-sm font-bold">Overall Level</FormLabel>
                  <FormControl>
                    <select v-model="fighter.ovr" class="rounded-sm p-1 bg-slate-500 w-1/4">
                      <option v-for="level in Array.from({length: 91-78+1}, (_, i) => 78 + i)" :key="level" :value="level">
                        {{ level }}
                      </option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
        </FormField>
      </div>
      <!-- Weight Division Radio Group -->
      <div class="col-span-2">
        <FormField v-slot="{ field }" name="naturalWeightDivision" class="mb-4">
          <FormItem>
            <FormLabel class="block text-gray-700 text-sm font-bold">Natural Weight Division</FormLabel>
            <FormControl>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="100-112: Fly" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Fly</span> (100-112)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="112-118: Bantam" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Bantam</span> (112-118)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="118-126: Feather" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Feather</span> (118-126)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="126-135: Light" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Light</span> (126-135)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="135-147: Welter" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Welter</span> (135-147)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="147-160: Middle" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">Middle</span> (147-160)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="160-175: Light Heavy" class="mr-2">
                  <span class="text-gray-600 font-bold text-sm mr-2">L Heavy</span> (160-175)
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="fighter.naturalWeightDivision" value="200-260: Heavy" class="mr-2">
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

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from "~/stores/authStore.js";

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

watch(fighter.value, (newVal) => {
  if (newVal.naturalWeightDivision === '100-112: Fly') {
    maxReach.value = 67;
    maxHeight.value = 65; // 5' 5"
  } else if (newVal.naturalWeightDivision === '112-118: Bantam') {
    maxReach.value = 67;
    maxHeight.value = 67; // 5' 7"
  } else if (newVal.naturalWeightDivision === '118-126: Feather') {
    maxReach.value = 69;
    maxHeight.value = 68; // 5' 8"
  } else if (newVal.naturalWeightDivision === '126-135: Light') {
    maxReach.value = 71;
    maxHeight.value = 69; // 5' 9"
  } else if (newVal.naturalWeightDivision === '135-147: Welter') {
    maxReach.value = 73;
    maxHeight.value = 71; // 5' 11"
  } else if (newVal.naturalWeightDivision === '147-160: Middle') {
    maxReach.value = 76;
    maxHeight.value = 73; // 6' 1"
  } else if (newVal.naturalWeightDivision === '160-175: Light Heavy') {
    maxReach.value = 80;
    maxHeight.value = 75; // 6' 3"
  } else {
    maxReach.value = 86; // Default max reach for other divisions
    maxHeight.value = 80; // Default max height for other divisions
  }
  // Reset reach if it's beyond the new maxReach
  if (newVal.reach > maxReach.value) {
    newVal.reach = maxReach.value;
  }
  // Reset height if it's beyond the new maxHeight
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

const onSubmit = () => {
  const data = {
    ...fighter.value,
    firstName: fighter.value.firstName,
    lastName: fighter.value.lastName,
    nickname: fighter.value.nickname || 'N/A',
    stance: fighter.value.stance.charAt(0).toUpperCase() + fighter.value.stance.slice(1),
    ovr: fighter.value.ovr || 0,
    heightFt: Math.floor(fighter.value.heightValue / 12),
    heightIn: fighter.value.heightValue % 12,
    reach: parseInt(fighter.value.reach),
    naturalWeightDivision: fighter.value.naturalWeightDivision.split(': ')[1]
  };

  // Log the request data to be sent
  console.log('Request Data:', data);

  // Log the request headers including the cookies
  console.log('Request Headers:', {
    'Content-Type': 'application/json',
    // Include cookies in the request
    'Cookie': document.cookie,
  });

  // Fetch request
  fetch('https://vbc-login-production.up.railway.app/api/v1/fighter/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // No need to include 'Cookie' header here, as it's included above
    },
    body: JSON.stringify(data),
    credentials: 'include', // This ensures that cookies are included in the request
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};



</script>

<style scoped>
/* Add custom styles here */
</style>
