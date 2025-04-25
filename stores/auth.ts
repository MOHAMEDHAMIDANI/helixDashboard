// stores/auth.ts
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
        async setTokens() {
            const accessToken = useCookie('access_token');
            const refreshToken = useCookie('refresh_token');
            this.access_token = accessToken.value || null;
            this.refresh_token = refreshToken.value || null;
        },

        async login(credentials: { email: string; password: string }) {
            const router = useRouter();

            this.loading = true;
            this.error = null;

            try {
                const response = await $fetch('/auth/login', {
                    method: 'POST',
                    body: credentials,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const accessToken = useCookie('access_token', {
                    maxAge: 60 * 15,
                    sameSite: 'strict',
                    secure: true
                });

                const refreshToken = useCookie('refresh_token', {
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: 'strict',
                    secure: true
                });

                this.access_token = accessToken.value;
                this.refresh_token = refreshToken.value;

                await this.setTokens();
                await this.fetchUser();

                router.push('/dashboard');
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Login failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchUser() {
            try {
                const response = await $fetch('/auth/me', {
                    method: 'GET'
                });
                this.user = response.data;
            } catch (err) {
                await this.logout();
                throw err;
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

                const accessToken = useCookie('access_token');
                accessToken.value = response.data.access_token;

                await this.setTokens();
                return response.data.access_token;
            } catch (err) {
                await this.logout();
                throw err;
            }
        },

        async logout() {
            const router = useRouter();
            try {
                await $fetch('/auth/logout',
                    {
                        method: 'POST'
                    }
                );
            } finally {
                const accessToken = useCookie('access_token');
                const refreshToken = useCookie('refresh_token');

                accessToken.value = null;
                refreshToken.value = null;

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
            try {
                await $fetch('/auth/change-password', {
                    method: 'POST',
                    body: passwords
                });
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Password change failed';
                throw err;
            } finally {
                this.loading = false;
            }
        }
    }
});