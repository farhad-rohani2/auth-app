// server/api/logout.post.js
export default defineEventHandler(async (event) => {
    try {
        deleteCookie(event, 'session_token', { path: '/' })

        return {
            success: true,
            message: 'خروج با موفقیت انجام شد',
        }
    }catch(error) {
        console.error('server/api/logout.post.js',error);
    }

})
