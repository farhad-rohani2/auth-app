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
    plugins: [
        // {src: '@/plugins/localStorage.client.js', mode: 'client'}
        { src: '~/plugins/firebase.js', mode: 'client' },
    ],
    pages: true,
    // debug: true
})