import axios from 'axios'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
        withCredentials: true
    })

    let isRefreshing = false
    let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void; config: any }> = []

    const processQueue = (error: any, token: string | null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error)
            } else if (token) {
                prom.resolve(axiosInstance(prom.config))
            } else {
                prom.reject(new Error('No token after refresh'))
            }
        })
        failedQueue = []
    }

    axiosInstance.interceptors.request.use(
        (config) => {
            const authStore = useAuthStore()
            const token = authStore.access_token
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
        async (error) => {
            const authStore = useAuthStore()
            const originalRequest = error.config
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject, config: originalRequest })
                    })
                }
                isRefreshing = true
                try {
                    await authStore.refreshToken()
                    const newAccessToken = authStore.access_token
                    processQueue(null, newAccessToken)
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return axiosInstance(originalRequest)
                } catch (refreshError) {
                    processQueue(refreshError, null)
                    authStore.logout()
                    const router = nuxtApp.$router
                    router.push('/login')
                    return Promise.reject(refreshError)
                } finally {
                    isRefreshing = false
                }
            }

            return Promise.reject(error)
        },
    )

    return {
        provide: {
            axios: axiosInstance
        }
    }
})