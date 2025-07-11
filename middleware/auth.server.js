import {getCookie} from 'h3'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        const {verifyIdTokenLocally} = await import('@/server/utils/firebaseTokenVerifier.server')

        const event = useRequestEvent()
        const token = getCookie(event, 'session_token')
        if (!token) return;

        try {
            const decoded = await verifyIdTokenLocally(token)
            event.context.user = decoded
            const authUser = useState('authUser', () => null)
            authUser.value = decoded
        } catch (e) {
            console.log('[middleware] error', e)
            // if (to.path !== '/login') return navigateTo('/login');

        }
    }
})
