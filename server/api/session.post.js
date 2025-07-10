// import { adminAuth } from '@/server/utils/firebaseAdmin.js'


export default defineEventHandler(async (event) => {
    if (process.server) {
        const { adminAuth } = await import('@/server/utils/firebaseAdmin')
        // استفاده از adminAuth فقط اینجا
    }
    const body = await readBody(event)
    const { token } = body

    try {
        const decoded = await adminAuth.verifyIdToken(token)

        console.log('decoded',decoded)
        // Set cookie
        setCookie(event, 'session_token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 5, // 5 روز
            sameSite: 'lax', // یا 'strict' بسته به نیاز
            // secure: process.env.NODE_ENV === 'production' // در پروکدام باید true باشه
        })


        return { success: true, user: decoded }
    } catch (e) {
        return { success: false, error: 'Invalid token' }
    }
})
