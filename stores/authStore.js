import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const isAuthenticated = ref(false);
    const accessToken = ref(null);
    const currentGamer = ref(null);

    function setAuthenticated(gamerData, token) {
        isAuthenticated.value = true;
        currentGamer.value = gamerData;
        accessToken.value = token;
    }

    async function $login(email, password) {
        try {
            const response = await fetch('https://vbc-login-production.up.railway.app/api/v1/gamer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'An error occurred while logging in.');
            }

            const token = data.jwt; // Adjust this to match your API response structure

            // Set gamer data and authentication status
            setAuthenticated(data.gamer, token);

            return true;
        } catch (error) {
            console.error('Login error:', error.message);
            return false;
        }
    }

    // reset current store
    function $reset() {
        isAuthenticated.value = false;
        currentGamer.value = null;
        accessToken.value = null;
    }

    return {
        isAuthenticated,
        currentGamer,
        accessToken,
        $reset,
        $login
    };
}, {
    persist: {
        // Persist state configuration
    }
});
