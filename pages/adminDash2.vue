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
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="fighter.nickname" required />
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="text" id="image" v-model="fighter.image"  />
      </div>
      <div class="form-group">
        <label for="heightFt">Height Ft:</label>
        <input type="text" id="heightFt" v-model="fighter.heightFt" required />
      </div>
      <div class="form-group">
        <label for="heightIn">Height In:</label>
        <input type="text" id="heightIn" v-model="fighter.heightIn" required />
      </div>
      <div class="form-group">
        <label for="reach">Reach:</label>
        <input type="text" id="reach" v-model="fighter.reach" required />
      </div>
      <div class="form-group">
        <label for="stance">Stance:</label>
        <input type="text" id="stance" v-model="fighter.stance" required />
      </div>
      <div class="form-group">
        <label for="weightClass">Weight Class:</label>
        <input type="text" id="weightClass" v-model="fighter.weightClass" required />
      </div>
      <div class="form-group">
        <label for="ovr">OVR:</label>
        <input type="text" id="ovr" v-model="fighter.ovr" required />
      </div>
      <div class="form-group">
        <label for="residence">Residence:</label>
        <input type="text" id="residence" v-model="fighter.residence" required />
      </div>
      <div class="form-group">
        <label for="fights">Fights:</label>
        <input type="text" id="fights" v-model="fighter.fights" required />
      </div>
      <div class="form-group">
        <label for="nationality">Nationality:</label>
        <input type="text" id="nationality" v-model="fighter.nationality" required />
      </div>
      <div class="form-group">
        <label for="manager">Manager:</label>
        <input type="text" id="manager" v-model="fighter.manager" required />
      </div>
      <div class="form-group">
        <label for="trainer">Trainer:</label>
        <input type="text" id="trainer" v-model="fighter.trainer" required />
      </div>
      <div class="form-group">
        <label for="gym">Gym:</label>
        <input type="text" id="gym" v-model="fighter.gym" required />
      </div>
      <div class="form-group">
        <label for="promoter">Promoter:</label>
        <input type="text" id="promoter" v-model="fighter.promoter" required />
      </div>

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
        image: 'https://virtronesports.com/img/blank2.png',        
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
    async registerFighter() {
      try {

        if (!this.fighter.image) {
          // Use the default image URL if fighter.image is empty
          this.fighter.image = 'https://example.com/default-image.jpg'; // Set your default image URL here
        }
        
        const response = await fetch('https://virtron-production.up.railway.app/fighters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.fighter),
        });

        if (response.ok) {
          const fighterData = await response.json();
          console.log('Registered Fighter:', fighterData);
        } else {
          console.error('Failed to create a fighter');
          // Handle the error (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error creating a fighter:', error);
        // Handle the error (e.g., show an error message)
      }
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
