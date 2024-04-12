<template>
  <div>
    <select v-model="selectedOption">
    <option v-for="option in options" :key="option.id" :value="option.id">
    {{ option.name }}
  </option>
</select>
  </div>
</template>

<script setup>
  const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

const selectedOption = ref(null);

watch(selectedOption, () => {
  // Filter the list of options based on the selected option
  const filteredOptions = options.filter(option => option.name.includes(selectedOption.value));
  // Update the dropdown list with the filtered list of options
  select.options = filteredOptions;
});
</script>

<style scoped>

</style>