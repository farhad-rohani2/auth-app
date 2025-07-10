import { getCookie } from 'h3'

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('aaaaaaaaaaaaaa')
    if (process.server) {
        const event = useRequestEvent()
        const { adminAuth } = await import('@/server/utils/firebaseAdmin')

        const token = getCookie(event, 'session_token')

        console.log('[middleware] token', token)
        if (!token) {
            return navigateTo('/login')

        }
        try {
            const decoded = await adminAuth.verifyIdToken(token)
            console.log('[middleware] decoded', decoded)
            console.log(decoded)
            event.context.user = decoded
        } catch (e) {
            return navigateTo('/login')
        }
    }
})
