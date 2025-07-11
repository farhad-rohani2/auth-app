// server/api/session.post.js

import { readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { token } = body

    try {
        const {verifyIdTokenLocally} = await import('@/server/utils/firebaseTokenVerifier.server')

        const decoded = await verifyIdTokenLocally(token)

        setCookie(event, 'session_token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 5,
            sameSite: 'lax',
        })

        return { success: true, user: decoded }
    } catch (e) {
        console.error('❌ Token verification failed:', e.message)
        return { success: false, error: 'Invalid token' }
    }
})
