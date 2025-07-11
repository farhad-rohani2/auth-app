import {useStore} from "vuex";

export default defineNuxtRouteMiddleware(async (to, from) => {

    try {
        if (to.path !== '/') return;

        const authUser = useState('authUser').value;
        const isAuthenticatedInServer = useState('isAuthenticatedInServer').value;

        if (import.meta.server) {
            return !isAuthenticatedInServer ? navigateTo('/login') : navigateTo('/dashboard');
        }

        if (import.meta.client) {
            const store = useStore()
            if (isAuthenticatedInServer) store.dispatch('auth/setUser', authUser);
            let isAuthenticated = store.getters['auth/isAuthenticated']
            return isAuthenticated ? navigateTo('/dashboard') : navigateTo('/login');
        }
    }catch (error) {
        console.error('middleware/authIndex.js',error);
    }

})
