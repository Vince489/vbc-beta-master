export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Check if the user is authenticated
  if (authStore.currentGamer) {
    // Redirect logged-in users away from the login page
    if (to.path === '/login' || to.path === '/signup') {
      return '/dashboard'; // Redirect to the dashboard or any other page
    }
  }
});
