<template>

  <Profile :fighter="fighter" />

  <Bouts :fighter="fighter" />  

</template>

<script setup>
  const { fighters } = defineProps(['fighter'])
  const { id } = useRoute().params
  const uri = 'https://vbc-login-production.up.railway.app/api/v1/fighter' + id 

  // fetch fighters
  const { data: fighter } = await useFetch(uri, { key: id })
  
</script>

<style scoped>

</style>