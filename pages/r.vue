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
                  <input type="text" placeholder="Last Name" v-model="lastName" class="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

        <!-- Natural Weight Division -->
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
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

export default {
  components: {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  },
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const nickname = ref("");
    const stance = ref("");
    const ovr = ref("");
    const height = ref(65); // Initialize with a default value
    const reach = ref(65); // Initialize with a default value
    const naturalWeightDivision = ref("");
    const selectedWeightClass = ref("");
    const weightClasses = ref([
      { value: "Flyweight", label: "Flyweight (100-112)" },
      { value: "Super Flyweight", label: "Super Flyweight (112-115)" },
      { value: "Bantamweight", label: "Bantamweight (115-118)" },
      { value: "Super Bantamweight", label: "Super Bantamweight (118-122)" },
      { value: "Featherweight", label: "Featherweight (122-126)" },
      { value: "Super Featherweight", label: "Super Featherweight (126-130)" },
      { value: "Lightweight", label: "Lightweight (130-135)" },
      { value: "Super Lightweight", label: "Super Lightweight (135-140)" },
      { value: "Welterweight", label: "Welterweight (140-147)" },
      { value: "Super Welterweight", label: "Super Welterweight (147-154)" },
      { value: "Middleweight", label: "Middleweight (154-160)" },
      { value: "Super Middleweight", label: "Super Middleweight (160-168)" },
      { value: "Light Heavyweight", label: "Light Heavyweight (168-175)" },
      { value: "Cruiserweight", label: "Cruiserweight (175-200)" },
      { value: "Heavyweight", label: "Heavyweight (200-260)" },
    ]);
    
    const overallLevels = Array.from({ length: 20 }, (_, index) => index + 1);

    const filteredWeightClasses = computed(() => {
      const divisionMap = {
        Fly: ["Flyweight", "Super Flyweight"],
        Bantam: ["Bantamweight", "Super Bantamweight"],
        Feather: ["Featherweight", "Super Featherweight"],
        Light: ["Lightweight", "Super Lightweight"],
        Welter: ["Welterweight", "Super Welterweight"],
        Middle: ["Middleweight", "Super Middleweight"],
        L_Heavy: ["Light Heavyweight"],
        Heavy: ["Cruiserweight", "Heavyweight"],
      };
      const selectedDivision = naturalWeightDivision.value;
      const allowedClasses = divisionMap[selectedDivision] || [];
      return weightClasses.value.filter((weightClass) =>
        allowedClasses.includes(weightClass.value)
      );
    });

    const minHeight = 61; // minimum height value in inches
    const maxHeight = 84; // maximum height value in inches
    const maxReach = 88; // maximum reach value in inches

    const feet = computed(() => Math.floor(height.value / 12));
    const inches = computed(() => height.value % 12);

    const authStore = useAuthStore();
    const router = useRouter();
    const errorMessage = ref("");
    const successMessage = ref("");

    const registerFighter = async () => {
      errorMessage.value = "";
      successMessage.value = "";
      try {
        const formData = {
          firstName: firstName.value,
          lastName: lastName.value,
          nickname: nickname.value,
          stance: stance.value,
          overall: ovr.value,
          height: height.value,
          reach: reach.value,
          naturalWeightDivision: naturalWeightDivision.value,
          currentWeightClass: selectedWeightClass.value,
        };
        const token = authStore.getToken; 
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post(
          "https://api.virtronboxing.com/fighters",
          formData,
          config
        );
        successMessage.value = "Fighter registered successfully!";
      } catch (error) {
        errorMessage.value = "Registration failed. Please try again.";
      }
    };

    return {
      firstName,
      lastName,
      nickname,
      stance,
      ovr,
      height,
      reach,
      naturalWeightDivision,
      selectedWeightClass,
      filteredWeightClasses,
      weightClasses,
      minHeight,
      maxHeight,
      maxReach,
      feet,
      inches,
      overallLevels,
      errorMessage,
      successMessage,
      registerFighter,
    };
  },
};
</script>
