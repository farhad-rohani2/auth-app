import {useStore} from "vuex";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path !== '/login' && to.path !== '/register') return;

    const authUser = useState('authUser').value;
    const isAuthenticatedInserver = authUser && Object.keys(authUser ?? {}).length !== 0;

    if (process.server && !isAuthenticatedInserver) return navigateTo('/dashboard');

    if (process.client) {
        const store = useStore()
        if (isAuthenticatedInserver) store.dispatch('auth/setUser', authUser);
        let isAuthenticated = store.getters['auth/isAuthenticated']
        if (isAuthenticated) return navigateTo('/dashboard');
    }
})
