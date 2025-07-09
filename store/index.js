import { createStore } from 'vuex'
import auth from './auth'
import notifications from "./notifications.js";
// import persist from "~/plugins/persist.js";


export const store = createStore({
    modules: {
        auth,
        notifications
    },
    // plugins: [persist]
})
