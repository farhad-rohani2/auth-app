import createPersistedState from 'vuex-persistedstate'

export default defineNuxtPlugin(({ store }) => {
    createPersistedState({
        key: 'my-app',
        paths: ['auth'],
        storage: window.localStorage
    })(store)
})