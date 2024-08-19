import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(null);
  const currentGamer = ref(null);
  const fighters = ref([]);

  const router = useRouter();

  function setAuthenticated(gamerData) {
      currentGamer.value = gamerData;
      fighters.value = gamerData.fighters || [];
      // Store the entire gamer data, including the managerRole
      if (typeof window !== 'undefined') {
          localStorage.setItem('currentGamer', JSON.stringify(gamerData));
      }
  }

  async function fetchGamerData() {
      try {
          const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/me', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.value}`,
              },
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || 'An error occurred while fetching gamer data.');
          }

          setAuthenticated(data.gamer);

          return true;
      } catch (error) {
          console.error('Fetch gamer data error:', error.message);
          return false;
      }
  }

  async function registerManager(newManagerData) {
      try {
          const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/manager', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.value}`,
              },
              body: JSON.stringify(newManagerData),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || 'Unknown error occurred');
          }

          // After registration, update the currentGamer with the manager data
          currentGamer.value.managerRole = data.manager;
          setAuthenticated(currentGamer.value); // Update local storage with the new data

          router.push('/overview');

          return true;
      } catch (error) {
          console.error('Manager registration error:', error.message);
          throw error;
      }
  }

  function $reset() {
      currentGamer.value = null;
      token.value = null;
      fighters.value = [];
      if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentGamer'); // Clear currentGamer from local storage
      }
  }

  async function initializeStore() {
      if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('authToken');
          const storedGamer = localStorage.getItem('currentGamer');
          if (storedToken) {
              token.value = storedToken;
              if (storedGamer) {
                  currentGamer.value = JSON.parse(storedGamer);
                  fighters.value = currentGamer.value.fighters || [];
              } else {
                  await fetchGamerData();
              }
          }
      }
  }

  initializeStore();

  return {
      currentGamer,
      token,
      fighters,
      $reset,
      $login,
      fetchGamerData,
      registerFighter,
      initializeStore,
      registerManager,
  };
}, {
  persist: {
      enabled: process.client,
      strategies: [
          {
              key: 'authStore',
              storage: process.client ? localStorage : null,
          },
      ],
  },
});
