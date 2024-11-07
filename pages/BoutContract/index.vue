<template>
  <div class="max-w-2xl mx-auto p-8 shadow-lg rounded-lg">
    <h2 class="text-center text-2xl font-bold mb-6">OFFICIAL BOUT CONTRACT FOR PROFESSIONAL BOXING</h2>
    <form>
      <div class="mb-4">
        <label class="block text-gray-200">Promoter:</label>
        <input type="text" name="promoter" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Boxer's Name:</label>
        <input type="text" name="boxer" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Boxer’s ID Number:</label>
        <input type="text" name="federal-id" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Opponent:</label>
        <input type="text" name="opponent" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Opponent's ID Number:</label>
        <input type="text" name="opponent-id" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Date of Bout:</label>
        <div class="flex space-x-2">
          <input type="text" name="month" placeholder="Month" required class="w-1/3 p-2 border border-gray-300 rounded">
          <input type="text" name="day" placeholder="Day" required class="w-1/3 p-2 border border-gray-300 rounded">
          <input type="text" name="year" placeholder="Year" required class="w-1/3 p-2 border border-gray-300 rounded">
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Venue Name:</label>
        <input type="text" name="venue-name" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Title Bout:</label>
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input type="radio" name="title-bout" value="yes" required class="mr-2"> Yes
          </label>
          <label class="flex items-center">
            <input type="radio" name="title-bout" value="no" required class="mr-2"> No
          </label>
          <input type="text" name="title-details" placeholder="If yes, specify title(s)" class="flex-1 p-2 border border-gray-300 rounded">
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Number of Rounds:</label>
        <input type="number" name="rounds" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Contract Weight:</label>
        <input type="text" name="contract-weight" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Boxer’s Purse Amount: $</label>
        <input type="text" name="boxer-purse" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Opponent’s Purse Amount: $</label>
        <input type="text" name="opponent-purse" required class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Rules:</label>
        <textarea name="rules" rows="4" placeholder="Specify any rules for the bout..." required class="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Bonuses:</label>
        <textarea name="bonuses" rows="3" placeholder="Specify any bonuses or incentives..." required class="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-200">Promotion Requirements:</label>
        <textarea name="promotion-requirements" rows="3" placeholder="Specify promotion requirements for fighters..." required class="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "BoutContractForm",
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
