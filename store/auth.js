import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged // برای مدیریت وضعیت ورود/خروج
} from "firebase/auth";

// import { auth } from '~/plugins/firebase'; // 👈 مستقیم import
import { auth } from '~/composables/firebaseConfig';

export default {
    namespaced: true,
    state: () => ({
        user: null,
        isAuthenticated: false,
        authError: null,
        authLoading: false,
    }),

    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.isAuthenticated = !!user;
        },
        SET_AUTH_ERROR(state, error) {
            state.authError = error;
        },
        SET_AUTH_LOADING(state, isLoading) {
            state.authLoading = isLoading;
        },
        CLEAR_AUTH_STATE(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.authError = null;
            state.authLoading = false;
        },
    },

    actions: {
        async signup({ commit, dispatch }, { email, password }) {
            console.log(email, password);
            commit("SET_AUTH_LOADING", true);
            commit("SET_AUTH_ERROR", null);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                commit("SET_USER", userCredential.user);
                dispatch('notifications/notifySuccess', 'ثبت‌نام با موفقیت انجام شد!', { root: true })
            } catch (error) {
                commit("SET_AUTH_ERROR", error.message);
                dispatch('notifications/notifySuccess', 'خطا در ثبت‌نام', { root: true })

                throw error;
            } finally {
                commit("SET_AUTH_LOADING", false);
            }
        },

        async login({ commit, $auth }, { email, password }) {
            commit("SET_AUTH_LOADING", true);
            commit("SET_AUTH_ERROR", null);
            try {
                const userCredential = await signInWithEmailAndPassword($auth, email, password);
                commit("SET_USER", userCredential.user);
            } catch (error) {
                commit("SET_AUTH_ERROR", error.message);
                throw error;
            } finally {
                commit("SET_AUTH_LOADING", false);
            }
        },

        async logout({ commit, $auth }) {
            commit("SET_AUTH_LOADING", true);
            commit("SET_AUTH_ERROR", null);
            try {
                await signOut($auth);
                commit("CLEAR_AUTH_STATE");
            } catch (error) {
                commit("SET_AUTH_ERROR", error.message);
                throw error;
            } finally {
                commit("SET_AUTH_LOADING", false);
            }
        },

        async nuxtClientInit({ commit, $auth }) {
            return new Promise((resolve) => {
                onAuthStateChanged($auth, (user) => {
                    commit("SET_USER", user || null);
                    resolve();
                });
            });
        },
    },

    getters: {
        currentUser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
        authError: (state) => state.authError,
        authLoading: (state) => state.authLoading,
    },
};
