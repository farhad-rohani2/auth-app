// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    modules: [
        '@nuxt/eslint',
        '@bootstrap-vue-next/nuxt'
    ],
    css: [
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue-next/dist/bootstrap-vue-next.css'
    ],
    plugins: [],
    pages: true,
    // debug: true
    // serverMiddleware: [
    //     // { path: '/dashboard', handler: '~/server/middleware/auth.js' }
    // ]
})