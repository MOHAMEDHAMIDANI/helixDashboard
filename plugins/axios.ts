import axios from 'axios'
export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    })
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = useAuthStore().access_token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        },
    )
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                useAuthStore().logout()
            }
            return Promise.reject(error)
        },
    )
    return {
        provide: { axios: axiosInstance },
    }
})