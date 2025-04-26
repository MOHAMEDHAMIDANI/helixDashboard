// stores/auth.ts
import { Upload } from 'lucide-vue-next';
import { defineStore } from 'pinia';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: null as string | null | undefined,
        refresh_token: null as string | null | undefined,
        user: null as User | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        isAuthenticated: (state) => !!state.access_token,
        currentUser: (state) => state.user,
        isLoading: (state) => state.loading,
        authError: (state) => state.error
    },

    actions: {
        setTokens() {
            const accessTokenCookie = useCookie('access_token');
            const refreshTokenCookie = useCookie('refresh_token');
            this.access_token = accessTokenCookie.value || null;
            this.refresh_token = refreshTokenCookie.value || null;
        },

        async login(credentials: { email: string; password: string }) {
            const router = useRouter();
            this.loading = true;
            this.error = null;

            try {
                const { $axios } = useNuxtApp()
                const response = await $axios.post('/authentication/login', {
                    email: credentials.email,
                    password: credentials.password
                });
                this.setTokens();
                this.user = await response.data;
                router.push('/');
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Login failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },
        async refreshToken() {
            const refreshToken = useCookie('refresh_token');
            try {
                if (!refreshToken.value) {
                    throw new Error('No refresh token available');
                }

                const response = await $fetch('/auth/refresh', {
                    method: 'POST',
                    body: {
                        refresh_token: refreshToken.value
                    }
                });
                console.log(response);
                await this.setTokens();
            } catch (err) {
                await this.logout();
                throw err;
            }
        },
        async logout() {
            const router = useRouter();
            try {
                const { $axios } = useNuxtApp()
                const response = await $axios.post('/authentication/logout');
                console.log(response);
            } finally {
                this.$reset();
                router.push('/login');
            }
        },
        async changePassword(passwords: {
            current_password: string;
            new_password: string;
        }) {
            this.loading = true;
            this.error = null;
            const { $axios } = useNuxtApp()
            try {
                await $axios.patch('/authentication/updatePassword', {
                    current_password: passwords.current_password,
                    new_password: passwords.new_password
                });
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Password change failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },
        async deleteAccount() {
            this.loading = true;
            this.error = null;
            try {
                const { $axios } = useNuxtApp()
                await $axios.delete('/authentication/deleteAccount',);
                await this.logout();
                this.$reset();
                console.log('Account deleted');
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Account deletion failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },
        async GetUserFromToken() {
            const { $axios } = useNuxtApp()
            try {
                this.setTokens()
                if (!this.access_token || !this.refresh_token) {
                    useRouter().push('/login');
                    throw new Error('No access token available');
                }
                const response = await $axios.get('/authentication/getUser');
                this.user = response.data;
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Account deletion failed';
                throw err;
            }
        },
        async Upload(file : FormData) {
            const {$axios} = useNuxtApp()
            try {
                const response = await $axios.post('/authentication/uploadImage', file);
                console.log(response);
            } catch (error) {
                console.error(error)
            }
        },
        async updateUser( updateDto : { fullName: string; email: string; phoneNumber: string }) {
            const { $axios } = useNuxtApp()
            try {
                const response = await $axios.patch('/authentication/updateUser', updateDto);
                this.user = response.data;
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Account deletion failed';
                throw err;
            }
        }
    },
});