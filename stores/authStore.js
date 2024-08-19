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
            console.log(data);

            if (!response.ok) {
                // Throw error with detailed message
                throw new Error(data.message || 'An error occurred while logging in.');
            }

            // Set gamer data and authentication status
            setAuthenticated(data.gamer);
            console.log(data.gamer);

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
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                token.value = storedToken;
                await fetchGamerData();
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