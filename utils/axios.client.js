import axiosLib from 'axios'

// ایجاد اینستنس مستقل axios
// const axiosClient = axiosLib.create({
//     baseURL: 'http://localhost:8000/api', // آدرس API لاراول
//     headers: {
//         'Content-Type': 'application/json',
//     },
// })

// اضافه کردن interceptor برای اضافه کردن توکن از localStorage
// axiosClient.interceptors.request.use((config) => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })

export default axiosClient
