// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    runtimeConfig: {
        // server-only
        type:process.env.type,
        project_id:process.env.project_id,
        private_key_id:process.env.private_key_id,
        private_key:process.env.private_key,
        client_email:process.env.client_email,
        client_id:process.env.client_id,
        auth_uri:process.env.auth_uri,
        token_uri:process.env.token_uri,
        auth_provider_x509_cert_url:process.env.auth_provider_x509_cert_url,
        client_x509_cert_url:process.env.client_x509_cert_url,
        universe_domain:process.env.universe_domain,

        // exposed to client
        public: {

        }
    },
    devtools: {enabled: false},
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