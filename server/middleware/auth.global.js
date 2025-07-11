// server/middleware/auth.global.js
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
    if (!process.server) return

    const token = getCookie(event, 'session_token')
    if (!token) return

    try {
        const { verifyIdTokenLocally } = await import('@/server/utils/firebaseTokenVerifier.server')
        const decoded = await verifyIdTokenLocally(token)

        event.context.user = decoded
        // console.log('[auth.global] verified user:', decoded.email)
    } catch (e) {
        console.warn('[auth.global] error verifying token:', e.message)
    }
})
