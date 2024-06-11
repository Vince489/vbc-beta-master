<template>
  <div class="container mx-auto py-6 px-4 mt-2">
    <h1 class="text-2xl font-bold mb-4">Register New Fighter</h1>
    <form @submit.prevent="registerFighter">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-1 mb-4">
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
        <div class="col-span-1 mb-4">
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
</template>
