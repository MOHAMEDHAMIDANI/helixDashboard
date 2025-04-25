export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    authStore.setTokens();

    if (to.path === '/login' && authStore.isAuthenticated) {
        return navigateTo('/');
    }

    if (!authStore.isAuthenticated && to.path !== '/login') {
        return navigateTo('/login');
    }

});