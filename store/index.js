import { createStore } from 'vuex'
import auth from './auth'
import notifications from "./notifications.js";
import login from "~/pages/login.vue";


export const store = createStore({
    modules: {
        auth,
        notifications
    },
    actions: {
        async nuxtServerInit({ commit }, { ssrContext }) {
            login(process)
            const user = ssrContext?.event?.context?.user
            if (user) {
                commit('auth/SET_USER', user)
            }
        }
    }
})
