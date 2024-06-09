import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
    const isAuthenticated = ref(false);
    const accessToken = ref(null);
    const currentGamer = ref(null);
    const router = useRouter();

    function setAuthenticated(gamerData) {
        isAuthenticated.value = true;
        currentGamer.value = gamerData;
        router.push('/dashboard');
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
                credentials: 'include' // This includes cookies in the request
            });
    
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.message || 'An error occurred while logging in.');
            }
        
            // Set gamer data and authentication status
            setAuthenticated(data.gamer);
            
            // Redirect to dashboard
            router.push('/dashboard');

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
