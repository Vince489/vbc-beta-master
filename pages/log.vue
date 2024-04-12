<template>
  <div class="flex justify-center items-center mt-32">
    <div class="w-full max-w-sm">
      <div>
        <h1 class="p-10">Login</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="gamerTag">
            Gamertag
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gamerTag" type="text" placeholder="Gamertag" v-model="gamerTag">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
          <p class="hidden text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex justify-center">
          <button class="btn" type="submit">
            Login
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2023 Planet Virtron. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gamerTag: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('https://planet-virtron-api-production.up.railway.app/api/v1/gamer', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            gamerTag: this.gamerTag,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const responseData = await response.json();
        sessionStorage.setItem('token', responseData.token)
        sessionStorage.setItem('authenticatedGamer', JSON.stringify(responseData.authenticatedGamer));
        console.log('Form submitted successfully');
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }
  }
}

</script>
