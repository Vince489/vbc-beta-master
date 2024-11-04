<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="card w-full max-w-sm bg-white shadow-lg rounded-lg p-6 text-center">
      <img
        :src="profilePic"
        alt="Profile Picture"
        class="profile-pic w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 class="text-xl font-semibold text-gray-800">{{ name }}</h1>
      <p class="text-gray-600">{{ title }}</p>
      <h2 class="text-lg font-medium text-gray-800">{{ organization }}</h2>
      <div class="my-2">
        <p class="flex items-center justify-center text-gray-600">
          <i class="fas fa-envelope mr-2"></i> {{ email }}
        </p>
        <p class="flex items-center justify-center text-gray-600">
          <i class="fas fa-phone mr-2"></i> {{ phone }}
        </p>
        <p class="flex items-center justify-center text-gray-600">
          <i class="fas fa-fax mr-2"></i> {{ fax }}
        </p>
        <p class="flex items-center justify-center text-gray-600">
          <i class="fas fa-globe mr-2"></i> {{ website }}
        </p>
      </div>
      <img class="qrc w-24 h-24 mx-auto my-4" :src="qrCode" alt="QRC" />
      <div class="text-gray-600">
        <p>We accept Lien of Protection</p>
        <p>for</p>
        <p>Auto Accident Victims</p>
      </div>
      <button @click="downloadVCard" class="download-btn bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Add to Contacts
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  profilePic: {
    type: String,
    default: 'data:image/png;base64,iVBORw0KGgoAAAANS...', // Default profile picture
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    default: './qrc.png', // Default QRC image
  },
});

const downloadVCard = () => {
  const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${props.name}
ORG:${props.organization}
EMAIL:${props.email}
TEL:${props.phone}
URL:${props.website}
PHOTO;ENCODING=b;TYPE=PNG:${props.profilePic.split(',')[1]}
END:VCARD`;

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.name.replace(/\s+/g, '_')}.vcf`;
  a.click();
  
  window.URL.revokeObjectURL(url);
};
</script>

<style scoped>
.profile-pic {
  padding-top: 50px; /* Additional padding can be adjusted in Tailwind */
}
</style>
