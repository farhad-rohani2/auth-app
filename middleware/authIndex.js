import {useStore} from "vuex";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (to.path !== '/') return;

    const authUser = useState('authUser').value;
    const isAuthenticatedInserver = authUser && Object.keys(authUser ?? {}).length !== 0;

    if (process.server) {
        return !isAuthenticatedInserver ? navigateTo('/login') : navigateTo('/dashboard');
    }

    if (process.client) {
        const store = useStore()
        if (isAuthenticatedInserver) store.dispatch('auth/setUser', authUser);
        let isAuthenticated = store.getters['auth/isAuthenticated']
        return isAuthenticated ? navigateTo('/dashboard') : navigateTo('/login');
    }

})
