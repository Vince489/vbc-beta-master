<template>
  <div class="flex justify-center items-center mt-32">
    <div class="w-full max-w-sm ">
      <div>
        <h1 class="pb-6 text-4xl">Verify Email</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="otp">
            OTP
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="otp" type="text" placeholder="****" v-model="otp">
          <p class="hidden text-red-500 text-xs italic">Please type your OTP.</p>
        </div>
        <div class="flex justify-center">
          <button class="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      otp: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('https://zplogin-production.up.railway.app/api/v1/email_verification/verify', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            otp: this.otp
          })
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        console.log('Form submitted successfully')

        // Clear the inputs
        // this.email = ''
        // this.otp = ''

        this.$router.push('/login')
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped>

</style>

<script>




</script>
