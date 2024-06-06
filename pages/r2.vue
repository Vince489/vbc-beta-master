<template>
  <div v-if="isAuthenticated" class="container mx-auto py-6 px-4 px-md-4 px-lg-5 mt-2">
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
              <input type="text" placeholder="Nickname" v-model="fighter.singleInput" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <!-- Stance Radio Group -->
      <div class="col-span-2">
        <FormField v-slot="{ field }" name="stance" class="mb-4">
          <FormItem>
            <FormLabel class="block text-gray-700 text-sm font-bold">Stance</FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
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
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '~/stores/authStore.js';
import { useRouter } from 'vue-router';

interface Fighter {
  firstName: string;
  lastName: string;
  singleInput: string;
  stance: string;
  weightDivision: string;
  reach: number;
  heightValue: number;
}

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const router = useRouter();

const fighter = ref<Fighter>({
  firstName: '',
  lastName: '',
  singleInput: '',
  stance: '',
  weightDivision: '',
  reach: 50,
  heightValue: 64
});

const minHeight = ref(64);
const maxHeight = ref(80);
const maxReach = ref(86);

watch(() => fighter.value.weightDivision, (newVal) => {
  switch (newVal) {
    case '100-112: Fly':
      maxReach.value = 67;
      maxHeight.value = 65;
      break;
    case '112-118: Bantam':
      maxReach.value = 67;
      maxHeight.value = 67;
      break;
    case '118-126: Feather':
      maxReach.value = 69;
      maxHeight.value = 68;
      break;
    case '126-135: Light':
      maxReach.value = 71;
      maxHeight.value = 69;
      break;
    case '135-147: Welter':
      maxReach.value = 73;
      maxHeight.value = 71;
      break;
    case '147-160: Middle':
      maxReach.value = 76;
      maxHeight.value = 73;
      break;
    case '160-175: Light Heavy':
      maxReach.value = 80;
      maxHeight.value = 75;
      break;
    default:
      maxReach.value = 86;
      maxHeight.value = 80;
  }

  if (fighter.value.reach > maxReach.value) {
    fighter.value.reach = maxReach.value;
  }

  if (fighter.value.heightValue > maxHeight.value) {
    fighter.value.heightValue = maxHeight.value;
  }
});

watch(() => fighter.value.heightValue, (newVal) => {
  if (newVal < minHeight.value) {
    fighter.value.heightValue = minHeight.value;
  } else if (newVal > maxHeight.value) {
    fighter.value.heightValue = maxHeight.value;
  }
});

const feet = computed(() => Math.floor(fighter.value.heightValue / 12));
const inches = computed(() => fighter.value.heightValue % 12);

const onSubmit = () => {
  console.log('Form submitted with data:', fighter.value);
};
</script>

<style scoped>
/* Add custom styles here */
</style>
