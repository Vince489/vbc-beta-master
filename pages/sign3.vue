<template>
  <form @submit.prevent="signup">
    <input type="text" v-model="gamerTag" placeholder="Gamer Tag" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      gamerTag: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signup() {
      const response = await fetch("https://gaming-token-production.up.railway.app/api/v1/gamer/signup", {
        method: "POST",
        mode: "cors",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gamerTag: this.gamerTag,
          email: this.email,
          password: this.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        this.$router.push("/dashboard");
      } else {
        console.error("Failed to sign up");
      }
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
