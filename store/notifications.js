export default {
    namespaced: true,
    state: () => ({
        message: null,
        title: null,
        variant: 'info',
    }),
    mutations: {
        SET_NOTIFICATION(state, { message, title = 'پیام سیستم', variant = 'info' }) {
            state.message = message
            state.title = title
            state.variant = variant
        },
        CLEAR_NOTIFICATION(state) {
            state.message = null
            state.title = null
            state.variant = 'info'
        }
    },
    actions: {
        notify({commit}, payload) {
            commit('SET_NOTIFICATION', payload)
            // بعد از چند ثانیه پاک شود (مثلاً auto-hide)
            setTimeout(() => {
                commit('CLEAR_NOTIFICATION')
            }, 5000)
        },
        notifySuccess({commit}, message) {
            commit('SET_NOTIFICATION', {
                message:message,
                title:'موفقیت',
                variant:'success'
            })
        },
        notifyError({commit},  message) {
            commit('SET_NOTIFICATION', {
                message:message,
                title:'خطا',
                variant:'danger'
            })
        },
        clearNotice({commit}) {
            commit('CLEAR_NOTIFICATION')
        }
    },
    getters: {
        notification: (state) => ({
            message: state.message,
            title: state.title,
            variant: state.variant,
        })
    }
}
