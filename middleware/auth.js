import { useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp()
    const store = nuxtApp.$store
    let isAuthenticated = store?.getters['auth/isAuthenticated']
    if (!isAuthenticated && store?._actions['auth/nuxtClientInit']) {
        await store.dispatch('auth/nuxtClientInit')
         isAuthenticated = store.getters['auth/isAuthenticated']
    }

    if (isAuthenticated && (to.path == '/login' || to.path === '/register')) {
        return navigateTo('/dashboard');
    }
})
