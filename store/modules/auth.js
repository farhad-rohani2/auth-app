// import axiosClient from '~/utils/axios.client.js'
export default {
    namespaced: true,

    state: () => ({
        user: null,
        token: process.client ? localStorage.getItem('token') : null,
    }),

    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, payload) {
            state.token = payload
            if (process.client) localStorage.setItem('token', payload)
        },
        clearAuth(state) {
            state.user = null
            state.token = null
            if (process.client) localStorage.removeItem('token')
        }
    },

    actions: {
        async login({commit}, {email, password}) {

            const axiosClient = useNuxtApp().$axios
            try {
                const res = await axiosClient.post('/accounts:signInWithPassword', {
                    email,
                    password
                })

                commit('setUser', res.data)
                commit('setToken', res.data.idToken)
            } catch (err) {
                throw new Error(err.response?.data?.message || 'Login failed')
            }
        },
        // async signup({ commit }, { email, password }) {
        //     try {
        //         const res = await $fetch('http://localhost:8000/api/accounts:signUp', {
        //             method: 'POST',
        //             body: { email, password }
        //         })
        //         commit('setUser', res)
        //         commit('setToken', res.idToken)
        //         return res
        //     } catch (err) {
        //         throw new Error(err?.data?.error?.message || 'Signup failed')
        //     }
        // },
        //
        // async logout({ commit, state }) {
        //     try {
        //         await $fetch('http://localhost:8000/api/accounts:signOut', {
        //             method: 'POST',
        //             headers: {
        //                 Authorization: `Bearer ${state.token}`
        //             }
        //         })
        //     } catch (err) {
        //         // silent
        //     }
        //
        //     commit('clearAuth')
        // },
        //
        // async fetchMe({ commit, state }) {
        //     if (!state.token) return
        //
        //     try {
        //         const res = await $fetch('http://localhost:8000/api/me', {
        //             headers: {
        //                 Authorization: `Bearer ${state.token}`
        //             }
        //         })
        //         commit('setUser', res)
        //     } catch (err) {
        //         commit('clearAuth')
        //     }
        // }
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
        userEmail: (state) => state.user?.email || '',
    }
}
