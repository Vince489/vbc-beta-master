import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
    const token = ref(null);
    const currentGamer = ref(null);
    const fighters = ref([]); // Array to store fighters

    const router = useRouter();

    function setAuthenticated(gamerData) {
        currentGamer.value = gamerData;
        fighters.value = gamerData.fighters || [];
    }

    async function $login(email, password) {
        try {
          const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // This includes cookies in the request
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            // Throw error with detailed message
            throw new Error(data.message || 'An error occurred while logging in.');
          }
      
          // Set gamer data and authentication status
          setAuthenticated(data.gamer);
      
          // Store the token in the store
          token.value = data.token;
      
          // Redirect to overview
          router.push('/overview');
      
          return data; // Return the response data
        } catch (error) {
          // Re-throw the error so it can be caught in the Vue component
          throw error;
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

            // Set gamer data and update fighters
            setAuthenticated(data.gamer);

            return true;
        } catch (error) {
            console.error('Fetch gamer data error:', error.message);
            return false;
        }
    }

    async function deleteFighter(fighterId) {
        try {
          const response = await fetch(`https://vbc-login-production.up.railway.app/api/v1/fighters/delete/${fighterId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Assuming you have a function or a way to get your auth token
              'Authorization': `Bearer ${token.value}`
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete the fighter');
          }
      
          // Handle successful deletion
          console.log('Fighter deleted successfully');
          // Optionally, refresh the list of fighters or navigate away
        } catch (error) {
          console.error('Error deleting fighter:', error);
          // Handle error (e.g., show an error message to the user)
        }
      }    

    async function registerFighter(newFighterData) {
        try {
            const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/fighter/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
                body: JSON.stringify(newFighterData),
            });

            const data = await response.json();
            console.log("Data:", data);

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred while registering the fighter.');
            }

            // Update local store with the new fighter
            fighters.value.push(data.fighter);
            currentGamer.value.fighters = fighters.value;

            // Redirect to overview
            router.push('/overview');

            return true;
        } catch (error) {
            console.error('Registration error:', error.message);
            return false;
        }
    }

    // reset current store
    function $reset() {
        currentGamer.value = null;
        token.value = null;
        fighters.value = []; // Clear fighters array on reset
    }

    // Fetch gamer data when the store is initialized
    async function initializeStore() {
        if (token.value) {
            await fetchGamerData();
        }
    }

    return {
        currentGamer,
        token,
        fighters,
        $reset,
        $login,
        fetchGamerData,
        registerFighter,
        initializeStore,
    };
}, {
    persist: {
        enabled: process.client, // enable persistence only on the client side
        strategies: [
            {
                key: 'authStore',
                storage: process.client ? localStorage : null, // use localStorage only on the client side
            },
        ],
    },
});
