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
          
          if (!response.ok) {
            if (response.status === 401) {
              // If the status is 401, it means either the email or password is incorrect
              if (data.message === 'Invalid email') {
                // If the error message indicates an invalid email, reject with a specific message
                reject('Invalid email');
              } else if (data.message === 'Incorrect password') {
                // If the error message indicates an incorrect password, reject with a different message
                reject('Incorrect password');
              } else {
                // For other error cases, reject with the received error message
                reject(data.message);
              }
            } else {
              // For other HTTP error statuses, reject with the received error message
              reject(data.message);
            }
          } else {
            // Set user data and authentication status
            setAuthenticated(data.user, data.token, data.user.isAuthenticated);
            console.log('isAuth', data.user.isAuthenticated);
            resolve(data);
          }
        } catch (error) {
          console.error('Error logging in:', error);
          reject(error);
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