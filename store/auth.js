import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

// import { auth } from '~/plugins/firebase'; // 👈 مستقیم import
import { auth } from '~/composables/firebaseConfig';

export default {
    namespaced: true,
    state: () => ({
        user: null,
        authError: null,
        authLoading: false,
    }),

    mutations: {
        LOAD_FROM_STORAGE(state) {
            if (process.client) {
                const user = localStorage.getItem('user')
                state.user = user ? JSON.parse(user) : null
            }
        },
        SET_USER(state, user) {
            state.user = user;
            if (process.client) {
                localStorage.setItem('user', JSON.stringify(user))
            }

            let authUser = useState('authUser', () => null)
            authUser.value = user

            let isAuthenticatedInServer = useState('isAuthenticatedInServer', () => null)
            isAuthenticatedInServer.value =( user && (Object.keys(user).length !== 0));

        },
        SET_AUTH_ERROR(state, error) {
            state.authError = error;
        },
        SET_AUTH_LOADING(state, isLoading) {
            state.authLoading = isLoading;
        },
        CLEAR_AUTH_STATE(state) {
            state.user = null;
            state.authError = null;
            state.authLoading = false;
        },
    },

    actions: {
        setUser({commit}, user) {
            commit('SET_USER', user);
        },
        nuxtClientInit({commit}) {
            commit('LOAD_FROM_STORAGE')
        },
        async signup({ commit, dispatch }, { email, password }) {
            commit("SET_AUTH_LOADING", true);
            commit("SET_AUTH_ERROR", null);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                commit("SET_USER", userCredential.user);
                const idToken = await userCredential.user.getIdToken()
                await $fetch('/api/session', {
                    method: 'POST',
                    body: {token: idToken},
                    credentials: 'include',
                })
                dispatch('notifications/notifySuccess', 'ثبت‌نام با موفقیت انجام شد!', { root: true })
            } catch (error) {
                commit("SET_AUTH_ERROR", error.message);
                dispatch('notifications/notifyError', 'خطا در ثبت‌نام', { root: true })
            } finally {
                commit("SET_AUTH_LOADING", false);
            }
        },

        async login({ commit, dispatch }, { email, password }) {
            commit("SET_AUTH_LOADING", true);
            commit("SET_AUTH_ERROR", null);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                commit("SET_USER", userCredential.user);
                const idToken = await userCredential.user.getIdToken()
                await $fetch('/api/session', {
                    method: 'POST',
                    body: {token: idToken},
                    credentials: 'include',
                })
                dispatch('notifications/notifySuccess', 'ورود با موفقیت انجام شد!', { root: true })
            } catch (error) {
                commit("SET_AUTH_ERROR", error.message);
                dispatch('notifications/notifyError', 'خطا در ورود', { root: true })
            } finally {
                commit("SET_AUTH_LOADING", false);
            }
        },

        async logout({ commit, dispatch }) {
            commit("SET_AUTH_LOADING", true);
            commit("SET_AUTH_ERROR", null);
            try {
                await signOut(auth);
                commit("SET_USER", null);
                await $fetch('/api/logout', { method: 'POST' })
                dispatch('notifications/notifySuccess', 'خروج با موفقیت انجام شد!', { root: true })
            } catch (error) {
                commit("SET_AUTH_ERROR", error.message);
                dispatch('notifications/notifySuccess', 'خطا در خروج', { root: true })
                throw error;
            } finally {
                commit("SET_AUTH_LOADING", false);
            }
        },
    },

    getters: {
        currentUser: (state) => state.user,
        isAuthenticated: (state) =>  !! state.user,
        authError: (state) => state.authError,
        authLoading: (state) => state.authLoading,
    },
};
