import {useStore} from "vuex";

export default defineNuxtRouteMiddleware(async (to, from) => {

    try {
        if (to.path !== '/dashboard') return;

        const authUser = useState('authUser').value;
        const isAuthenticatedInServer = useState('isAuthenticatedInServer').value;

        if (import.meta.server && !isAuthenticatedInServer) return navigateTo('/login');

        if (import.meta.client) {
            const store = useStore();
            if (isAuthenticatedInServer) store.dispatch('auth/setUser', authUser);
            let isAuthenticated = store.getters['auth/isAuthenticated']
            if (!isAuthenticated) return navigateTo('/login');
        }
    }catch(error) {
        console.log('middleware/authDashboard.js', error)
    }

})
