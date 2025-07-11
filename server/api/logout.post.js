// server/api/logout.post.js
export default defineEventHandler(async (event) => {
    // حذف کوکی
    deleteCookie(event, 'session_token', { path: '/' })

    return {
        success: true,
        message: 'خروج با موفقیت انجام شد',
    }
})
