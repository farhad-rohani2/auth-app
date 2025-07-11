import {getCookie} from 'h3'

export default defineNuxtRouteMiddleware(async (to, from) => {
    function setUser(user) {
        const event = useRequestEvent()
        event.context.user = user
        let authUser = useState('authUser', () => null)
        authUser.value = user
        let isAuthenticatedInServer = useState('isAuthenticatedInServer', () => null)
        isAuthenticatedInServer.value = user && Object.keys(user).length !== 0;
    }
    if (import.meta.server) {
        const event = useRequestEvent()
        try {

            const {verifyIdTokenLocally} = await import('@/server/utils/firebaseTokenVerifier.server')
            const token = getCookie(event, 'session_token')
            if (!token){
               setUser({})
                if (to.path !== '/login') return navigateTo('/login');
            }


            const decoded = await verifyIdTokenLocally(token)
            setUser(decoded)
        } catch (e) {
            console.log('middleware/auth.server.ir', e)
            setUser({})
            if (to.path !== '/login') return navigateTo('/login');

        }
    }
})
