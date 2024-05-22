<template>
  <div>
    <FormField v-slot="{ field }">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <input type="text" placeholder="Enter your username" v-model="username" v-bind="field" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Other form fields can be added similarly -->

    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
      // Other form fields can be added here
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log('Form submitted!');
      console.log('Username:', this.username);
      // Other form fields can be accessed similarly
    }
  }
};
</script>
