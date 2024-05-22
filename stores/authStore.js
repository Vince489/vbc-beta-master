import {defineStore} from "pinia";
import {ref} from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const isAuthenticated = ref(false)
    const accessToken = ref(null)
    const currentUser = ref(null)

    function setAuthenticated(currentUserData, token, auth) {
        isAuthenticated.value = auth
        currentUser.value = currentUserData
        accessToken.value = token
    }

    async function $login(email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch('https://zplogin-production.up.railway.app/api/v1/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken.value,
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const data = await response.json();
          console.log(data);
          if (!response.ok) {
            // If response is not ok, reject with the received error message
            reject(data.message || 'An error occurred while logging in.');
          } else {
            // Set user data and authentication status
            setAuthenticated(data.user, data.token, data.user.isAuthenticated);
            console.log('isAuth', data.user.isAuthenticated);
            resolve(data);
          }
        } catch (error) {
          // If an error occurred while fetching or parsing response, reject with a generic error message
          reject('An error occurred while logging in.');
        }
      });
    }
    
    
      
      

    // reset current store
    function $reset() {
        isAuthenticated.value = false
        currentUser.value = null
        accessToken.value = null
    }

    return {isAuthenticated, currentUser, setAuthenticated, $reset, accessToken, $login}
}, {
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: "strict"
        })
    }
})