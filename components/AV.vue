<template>
  <div class="fighter-registration">
    <h1>Register a Fighter</h1>
    <form @submit.prevent="registerFighter">
      <div class="form-group">
        <label for="gamerTag">Gamer Tag:</label>
        <input type="text" id="gamerTag" v-model="fighter.gamerTag" required />
      </div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="fighter.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="fighter.lastName" required />
      </div>
      <!-- Add similar input fields for other fighter attributes -->
      <!-- For example: nickname, image, heightFt, heightIn, reach, stance, weightClass, etc. -->
      <div class="form-actions">
        <button type="submit">Register Fighter</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fighter: {
        gamerTag: '',
        firstName: '',
        lastName: '',
        nickname: '',
        image: '',
        heightFt: '',
        heightIn: '',
        reach: '',
        stance: '',
        weightClass: '',
        ovr: '',
        residence: '',
        fights: '',
        nationality: '',
        manager: '',
        trainer: '',
        gym: '',
        promoter: '',
      },
    };
  },
  methods: {
    registerFighter() {
      // You can handle fighter registration here, e.g., by making an API request
      // Use this.fighter to access the fighter data
      console.log('Registered Fighter:', this.fighter);
    },
  },
};
</script>

<style scoped>
.fighter-registration {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
