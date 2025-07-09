import {useNuxtApp} from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp()
    const store = nuxtApp.$store

    let isAuthenticated = store.getters['auth/isAuthenticated']
    if (!isAuthenticated && store._actions['auth/nuxtClientInit']) {

        await store.dispatch('auth/nuxtClientInit').then(() => {
            isAuthenticated = store.getters['auth/isAuthenticated']
        })

    }

    if (isAuthenticated) {
        return navigateTo('/dashboard');
    } else {
        return navigateTo('/login');
    }
})
