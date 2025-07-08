import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    nuxtApp.provide('axios', instance)
})