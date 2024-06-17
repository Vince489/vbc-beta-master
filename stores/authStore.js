import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
    const token = ref(null);
    const currentGamer = ref(null);
    const router = useRouter();

    function setAuthenticated(gamerData) {
        currentGamer.value = gamerData;
        router.push('/overview');
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
            
            // Store the token in the store
            token.value = data.token;
            
            // Redirect to dashboard
            router.push('/overview');

            return true;
        } catch (error) {
            console.error('Login error:', error.message);
            return false;
        }
    }    

    // reset current store
    function $reset() {
        currentGamer.value = null;
        token.value = null;
    }

    return {
        currentGamer,
        token,
        $reset,
        $login
    };
}, {
    persist: {
        // Persist state configuration
    }
});
