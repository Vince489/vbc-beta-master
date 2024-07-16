<template>
  <div>
    <div class="container mx-auto py-6 px-4 mt-2">
      <h1 class="text-2xl font-bold mb-4">Register New Fighter</h1>
      <form @submit.prevent="registerFighter">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <FormField v-slot="{ field }" name="firstName" class="mb-4">
              <FormItem>
                <FormLabel class="block text-sm font-medium text-white">First Name</FormLabel>
                <FormControl>
                  <input type="text" placeholder="First Name" v-model="firstName" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="col-span-1">
            <FormField v-slot="{ field }" name="lastName" class="mb-4">
              <FormItem>
                <FormLabel class="block text-sm font-medium text-white">Last Name</FormLabel>
                <FormControl>
                  <input type="text" placeholder="First Name" v-model="lastName" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="col-span-2 mb-4">
            <FormField v-slot="{ field }" name="nickname" class="mb-4">
              <FormItem>
                <FormLabel class="block text-sm font-medium text-white">Nickname</FormLabel>
                <FormControl>
                  <input type="text" placeholder="Nickname" v-model="nickname" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <!-- Stance Radio Button Group -->
        <div class="col-span-2 mb-4">
          <FormField v-slot="{ field }" name="stance" class="mb-4">
            <FormItem>
              <FormLabel class="block text-white text-sm font-bold">Stance</FormLabel>
              <FormControl>
                <div class="flex items-center space-x-4">
                  <label class="inline-flex items-center text-white">
                    <input type="radio" v-model="stance" value="Southpaw" class="form-radio h-4 w-4 text-gray-700">
                    <span class="ml-2">Southpaw</span>
                  </label>
                  <label class="inline-flex items-center text-white">
                    <input type="radio" v-model="stance" value="Orthodox" class="form-radio h-4 w-4 text-gray-700">
                    <span class="ml-2">Orthodox</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

          <!-- Overall Level Dropdown -->
          <div class="col-span-2 mb-4">
            <FormField v-slot="{ field }" name="overallLvl" class="mb-4">
              <FormItem>
                <FormLabel class="block text-white text-sm font-bold">Overall Level</FormLabel>
                <FormControl>
                  <select v-model="ovr" class="rounded-sm p-1 bg-slate-500 w-1/4">
                    <option v-for="level in overallLevels" :key="level">
                      {{ level }}
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        
        <!-- Natural Weight division -->
        <div class="mb-4">
          <FormField v-slot="{ field }" name="naturalWeightDivision" class="mb-4">
            <FormItem>
              <FormLabel class="block text-sm font-medium text-white">Natural Weight Division</FormLabel>
              <FormControl>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center">
                    <input type="radio" id="fly" value="Fly" v-model="naturalWeightDivision" class="mr-2">
                    <label for="fly" class="text-white">Fly (100-112)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="bantam" value="Bantam" v-model="naturalWeightDivision" class="mr-2">
                    <label for="bantam" class="text-white">Bantam (112-118)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="feather" value="Feather" v-model="naturalWeightDivision" class="mr-2">
                    <label for="feather" class="text-white">Feather (118-126)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="light" value="Light" v-model="naturalWeightDivision" class="mr-2">
                    <label for="light" class="text-white">Light (126-135)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="welter" value="Welter" v-model="naturalWeightDivision" class="mr-2">
                    <label for="welter" class="text-white">Welter (135-147)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="middle" value="Middle" v-model="naturalWeightDivision" class="mr-2">
                    <label for="middle" class="text-white">Middle (147-160)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="lHeavy" value="L Heavy" v-model="naturalWeightDivision" class="mr-2">
                    <label for="lHeavy" class="text-white">L Heavy (160-175)</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="heavy" value="Heavy" v-model="naturalWeightDivision" class="mr-2">
                    <label for="heavy" class="text-white">Heavy (200-260)</label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Current Weight Class -->
        <div class="col-span-2 mb-4">
          <FormField v-slot="{ field }" name="currentWeightClass" class="mb-4">
            <FormItem>
              <FormLabel class="block text-white text-sm font-bold">Current Weight Class</FormLabel>
              <FormControl>
                <select v-model="selectedWeightClass" class="rounded-sm p-1 bg-slate-500 w- max-w-md">
                  <option disabled value="">Please select a weight class</option>
                  <option v-for="weightClass in filteredWeightClasses" :key="weightClass.value" :value="weightClass.value">
                    {{ weightClass.label }}
                  </option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Reach Slider -->
        <div class="col-span-2 mb-4">
          <FormField v-slot="{ field }" name="reach" class="mb-4">
            <FormItem>
              <FormLabel class="block text-white text-sm font-bold">Reach</FormLabel>
              <FormControl>
                <input type="range" v-model="reach" :max="maxReach" min="61" class="semibold w-full">
                <div class="font-semibold text-white text-sm mt-2">
                  <span>Reach value: {{ reach }}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
                 
          <!-- Height Slider -->
          <div class="col-span-2 mb-4">
            <FormField v-slot="{ field }" name="height" class="mb-4">
              <FormItem>
                <FormLabel class="block text-white text-sm font-bold">Height</FormLabel>
                <FormControl>
                  <input type="range" v-model="height" :min="minHeight" :max="maxHeight" class="w-full" />
                  <div class="flex justify-between text-white text-sm font-semibold mt-2">
                    <span>Height value: {{ feet }} ft {{ inches }} in</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register Fighter</button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '~/stores/authStore';

// Form fields
const firstName = ref('');
const lastName = ref('');
const nickname = ref('');
const stance = ref('');
const ovr = ref(78);
const height = ref(64);
const reach = ref(61);
const naturalWeightDivision = ref('');
const selectedWeightClass = ref(''); // Initialize selectedWeightClass
const errorMessage = ref('');
const successMessage = ref('');

// Auth store
const authStore = useAuthStore();

// Height and reach limits
const minHeight = ref(64);
const maxHeight = ref(80);
const maxReach = ref(86);

// Weight division options
const weightDivisions = [
  { value: 'Fly', label: 'Fly', range: '100-112', maxReach: 66, maxHeight: 65, minWC: 'Minimum', maxWC: 'Super Flyweight' },
  { value: 'Bantam', label: 'Bantam', range: '112-118', maxReach: 68, maxHeight: 67, minWC: 'Flyweight', maxWC: 'Super Bantamweight' },
  { value: 'Feather', label: 'Feather', range: '118-126', maxReach: 72, maxHeight: 69, minWC: 'Bantamweight', maxWC: 'Super Featherweight' },
  { value: 'Light', label: 'Light', range: '126-135', maxReach: 72, maxHeight: 69, minWC: 'Featherweight', maxWC: 'Super Lightweight' },
  { value: 'Welter', label: 'Welter', range: '135-147', maxReach: 74, maxHeight: 71, minWC: 'Lightweight', maxWC: 'Super Welterweight' },
  { value: 'Middle', label: 'Middle', range: '147-160', maxReach: 76, maxHeight: 73, minWC: 'Welterweight', maxWC: 'Super Middleweight' },
  { value: 'L Heavy', label: 'L Heavy', range: '160-175', maxReach: 80, maxHeight: 75, minWC: 'Middleweight', maxWC: 'Cruiserweight' },
  { value: 'Heavy', label: 'Heavy', range: '200-260', maxReach: 86, maxHeight: 77, minWC: 'Cruiserweight', maxWC: 'Heavyweight' }
];

const weightClasses = [
  { value: 'Minimum', label: 'Minimum (102-105 lbs)' },
  { value: 'Light Flyweight', label: 'Light Flyweight (105-108 lbs)' },
  { value: 'Flyweight', label: 'Flyweight (108-112 lbs)' },
  { value: 'Super Flyweight', label: 'Super Flyweight (112-115 lbs)' },
  { value: 'Bantamweight', label: 'Bantamweight (115-118 lbs)' },
  { value: 'Super Bantamweight', label: 'Super Bantamweight (118-122 lbs)' },
  { value: 'Featherweight', label: 'Featherweight (122-126 lbs)' },
  { value: 'Super Featherweight', label: 'Super Featherweight (126-130 lbs)' },
  { value: 'Lightweight', label: 'Lightweight (130–135 lbs)' },
  { value: 'Super Lightweight', label: 'Super Lightweight (135–140 lbs)' },
  { value: 'Welterweight', label: 'Welterweight (140–147 lbs)' },
  { value: 'Super Welterweight', label: 'Super Welterweight (147–154 lbs)' },
  { value: 'Middleweight', label: 'Middleweight (154–160 lbs)' },
  { value: 'Super Middleweight', label: 'Super Middleweight (160–168 lbs)' },
  { value: 'Light Heavyweight', label: 'Light Heavyweight (168–175 lbs)' },
  { value: 'Cruiserweight', label: 'Cruiserweight (175–200 lbs)' },
  { value: 'Heavyweight', label: 'Heavyweight (200+ lbs)' }
];

// Overall Levels
const overallLevels = computed(() => Array.from({ length: 91 - 78 + 1 }, (_, i) => 78 + i));

// Filtered weight classes based on selected natural weight division
const filteredWeightClasses = computed(() => {
  const division = weightDivisions.find(div => div.value === naturalWeightDivision.value);
  if (division) {
    const minIndex = weightClasses.findIndex(wc => wc.value === division.minWC);
    const maxIndex = weightClasses.findIndex(wc => wc.value === division.maxWC);
    return weightClasses.slice(minIndex, maxIndex + 1);
  }
  return [];
});

// Watcher for natural weight division
watch(naturalWeightDivision, (newVal) => {
  const division = weightDivisions.find(div => div.value === newVal);
  if (division) {
    maxReach.value = division.maxReach;
    maxHeight.value = division.maxHeight;
    minHeight.value = 64;  // Adjust as needed
  }

  // Reset reach if it exceeds the new maxReach
  if (reach.value > maxReach.value) {
    reach.value = maxReach.value;
  }

  // Reset height if it exceeds the new maxHeight
  if (height.value > maxHeight.value) {
    height.value = maxHeight.value;
  }
}, { deep: true });

// Computed properties for feet and inches
const feet = computed(() => Math.floor(height.value / 12));
const inches = computed(() => height.value % 12);

// Function to register a fighter
const registerFighter = async () => {
  const newFighterData = {
    firstName: firstName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    stance: stance.value,
    ovr: ovr.value,
    heightFt: feet.value,
    heightIn: inches.value,
    reach: reach.value,
    naturalWeightDivision: naturalWeightDivision.value,
    weightClass: selectedWeightClass.value // Ensure selectedWeightClass is properly defined
  };

  try {
    const success = await authStore.registerFighter(newFighterData);
    if (success) {
      successMessage.value = 'Fighter registered successfully!';
      errorMessage.value = '';
    } else {
      errorMessage.value = 'An error occurred while registering the fighter.';
      successMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = '';
  }
};
</script>



