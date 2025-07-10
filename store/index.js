import { createStore } from 'vuex'
import auth from './auth'
import notifications from "./notifications.js";


export const store = createStore({
    modules: {
        auth,
        notifications
    },
    actions: {
        async nuxtServerInit({ commit }, { ssrContext }) {
            const user = ssrContext?.event?.context?.user
            if (user) {
                commit('auth/SET_USER', user)
            }
        }
    }
})
