<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 my-10 flex flex-col items-center">
    <div class="bg-gray-600 text-white w-full max-w-md shadow-md rounded-lg p-6 mb-4">
      <p class="text-center text-white">
        A One-Time Password (OTP) has been sent to your email address. Please check your email and enter the OTP below to complete your registration. Didn't receive the email? Check your spam/junk folder or <a href="#" class="text-blue-400 hover:underline">resend the OTP</a>.
      </p>
    </div>
    <div class="bg-gray-400 w-full max-w-md shadow-md rounded-lg p-6">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-800 mb-4">Verify Email</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="otp">
            OTP
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="otp" type="text" placeholder="****" v-model="otp">
          <p class="hidden text-red-500 text-xs italic">Please type your OTP.</p>
        </div>
        <div class="flex justify-center">
          <button class="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
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
        const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/email_verification/verify', {
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
        this.$router.push('/login')
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
.btn {
  transition: background-color 0.3s ease;
}
</style>
