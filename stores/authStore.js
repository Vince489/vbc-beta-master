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

        // Ensure that the VRT coin data is stored
        if (gamerData.account && gamerData.account.vrtAccount) {
            gamerData.account.vrtAccount.coin = gamerData.account.vrtAccount.coin || {};
        }
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

            // Store the token in the store and local storage
            token.value = data.token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('authToken', data.token);
            }

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
            console.log('Fetched gamer data:', data);

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
        // Check if token exists if needed (for delete operations)
        if (!token.value) {
          console.error('No authentication token found. Cannot perform delete operation.');
          return { success: false, message: 'No authentication token found.' };
        }
      
        try {
          const response = await fetch(`https://vbc-login-production.up.railway.app/api/v1/fighter/delete/${fighterId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.value}`,
            },
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            const errorMessage = data.message || 'An error occurred while deleting the fighter.';
            throw new Error(errorMessage);
          }
      
          // Update the local store
          fighters.value = fighters.value.filter(f => f.id !== fighterId);
      
          // Redirect to overview
          router.push('/overview');
      
          return { success: true, message: 'Fighter deleted successfully!' };
        } catch (error) {
          console.error('Deletion error:', error.message);
          return { success: false, message: error.message };
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

            if (!response.ok) {
                // Extract the error message from the response
                const errorMessage = data.message || 'An error occurred while registering the fighter.';
                throw new Error(errorMessage);
            }

            // Update local store with the new fighter
            fighters.value.push(data.fighter);
            currentGamer.value.fighters = fighters.value;

            // Redirect to overview
            router.push('/overview');

            return { success: true, message: 'Fighter registered successfully!' };
        } catch (error) {
            console.error('Registration error:', error.message);
            return { success: false, message: error.message };
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
                // Throw the actual error message from the server
                throw new Error(data.message || 'Unknown error occurred');
            }

            // Optionally handle the registered manager data if needed
            console.log('Manager registered successfully:', data.manager);

            // Redirect to a relevant page, e.g., a dashboard or overview page
            router.push('/overview');

            return true;
        } catch (error) {
            // Log the error message to the console
            console.error('Manager registration error:', error.message);

            // Rethrow the error to make it available for the UI if needed
            throw error;
        }
    }

    // Retire the current fighter

    async function retireFighter(fighterId) {
        try {
            const response = await fetch(`https://vbc-login-production.up.railway.app/api/v1/fighter/retire/${fighterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred while retiring the fighter.');
            }

            // Update the local store with the new fighter data
            fighters.value = fighters.value.map(fighter => {
                if (fighter.id === fighterId) {
                    return data.fighter;
                }
                return fighter;
            });

            return { success: true, message: 'Fighter retired successfully!' };
        } catch (error) {
            console.error('Retirement error:', error.message);
            return { success: false, message: error.message };
        }
    }

    async function updateAvatar(imageFile) {
        if (!token.value) {
            throw new Error('User is not authenticated.');
        }
    
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
    
            const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/avatar', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
                body: formData,
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update avatar.');
            }
    
            // Optionally update the avatar URL directly, if needed
            currentGamer.value.avatarUrl = data.gamer.avatarUrl;
    
            // Fetch updated gamer data to ensure the store has the latest information
            await fetchGamerData();
    
            return { success: true, message: 'Avatar updated successfully!' };
        } catch (error) {
            console.error('Avatar update error:', error.message);
            return { success: false, message: error.message };
        }
    }
       

    // reset current store
    function $reset() {
        currentGamer.value = null;
        token.value = null;
        fighters.value = []; // Clear fighters array on reset
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken'); // Remove token from local storage
        }
    }

    // Fetch gamer data when the store is initialized
    async function initializeStore() {
        console.log('Initializing store...');
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('authToken');
    
            if (storedToken) {
                token.value = storedToken;
                try {
                    await fetchGamerData();
                } catch (error) {
                    console.error('Initialization error:', error.message);
                    $reset();
                }
            } else {
                console.warn('No stored token found.');
            }
        }
    }
    
    

    // Initialize the store when it is created
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
        deleteFighter,
        updateAvatar,
        retireFighter
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