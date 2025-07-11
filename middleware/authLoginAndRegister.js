import {useStore} from "vuex";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        if (to.path !== '/login' && to.path !== '/register') return;

        const authUser = useState('authUser').value;
        const isAuthenticatedInServer = useState('isAuthenticatedInServer').value;

        if (import.meta.server && isAuthenticatedInServer) return navigateTo('/dashboard');

        if (import.meta.client) {
            const store = useStore()
            if (isAuthenticatedInServer) store.dispatch('auth/setUser', authUser);
            let isAuthenticated = store.getters['auth/isAuthenticated']
            if (isAuthenticated) return navigateTo('/dashboard');
        }
    } catch (err) {
        console.error('middleware/authLoginAndRegister.js', err);
    }

})
