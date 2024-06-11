<template>
  <div class="p-2 flex justify-center items-center mt-20">
    <div class="w-full max-w-sm">
      <div>
        <h1 class="pb-6 text-4xl">Signup</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="bg-gray-400  shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="gamerTag">
            Gamertag
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gamerTag" type="text" placeholder="gamerTag" v-model="gamerTag">
          <p class="text-red-500 text-xs italic">{{ gamerTagError }}</p> <!-- Display gamerTag error -->
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
          <p class="text-red-500 text-xs italic">{{ emailError }}</p> <!-- Display email error -->
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
          <p class="text-red-500 text-xs italic">{{ passwordError }}</p> <!-- Display password error -->
        </div>
        <div class="flex justify-center">
          <button class="btn" type="submit">
            Sign Up
          </button>
        </div>
        <span v-if="apiError" class="text-red-500 text-xs italic">{{ apiError }}</span> <!-- Display API error -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gamerTag: '',
      email: '',
      password: '',
      gamerTagError: '',
      emailError: '',
      passwordError: '',
      apiError: '', // Variable to store API error
    };
  },
  methods: {
    async handleSubmit() {
      // Reset errors
      this.gamerTagError = '';
      this.emailError = '';
      this.passwordError = '';
      this.apiError = ''; // Reset API error

      // Validation logic (you can replace this with your own validation)
      if (!this.gamerTag) {
        this.gamerTagError = 'gamerTag is required.';
      }

      if (!this.email) {
        this.emailError = 'Email is required.';
      }

      if (!this.password) {
        this.passwordError = 'Password is required.';
      }

      // Perform signup logic if no errors
      if (!this.gamerTagError && !this.emailError && !this.passwordError) {
        try {
          const response = await fetch('http://localhost:5550/api/v1/gamer/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              gamerTag: this.gamerTag,
              email: this.email,
              password: this.password,
            }),
          });
          const data = await response.json();
          console.log('new gamer', data); // Log the response from the API

        // Check if the response contains errors
        if (data.errors && data.errors.length > 0) {
            // Extract the error message
            const errorMessage = data.errors[0].msg;
            this.apiError = errorMessage; // Set the API error message
        } else if (data.message === 'User already exists') {
            // Handle the case where the user already exists
            this.apiError = 'User already exists. Please use a different email or gamerTag.';
        } else {
            // Optionally, redirect to another page upon successful signup
            this.$router.push('/verify');
        }

        } catch (error) {
          console.error('Error signing up:', error);
          this.apiError = 'An error occurred while signing up. Please try again later.'; // Set a generic error message
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
