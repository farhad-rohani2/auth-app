import { createStore } from 'vuex'
import auth from './auth'
import notifications from "./notifications.js";


export const store = createStore({
    modules: {
        auth,
        notifications
    }
})
