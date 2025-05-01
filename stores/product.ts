import { defineStore } from 'pinia'
import type { Product } from '~/types'

export const useProductStore = defineStore('product', {
    state: () => ({
        Products: [] as Product[],
        error: null as string | null,
        loading: false as boolean
    }),

    getters: {

    },

    actions: {
        async initialize() {
            if (this.Products.length === 0) {
                await this.getProducts()
            }
        },

        async createProduct(formData: FormData) {
            const { $axios } = useNuxtApp();
            this.loading = true;
            this.error = null;

            try {
                const response = await $axios.post('/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.Products.push(response.data);
                return response.data;
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Product creation failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },
        async updateProduct(formData: FormData, id: string) {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null
            try {
                const response = await $axios.patch(`/products/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log('response', response.data)
                const index = this.Products.findIndex(p => p.id === id)
                if (index !== -1) {
                    this.Products[index] = response.data
                }
                return response.data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Category update failed'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteProduct(id: string) {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null

            try {
                await $axios.delete(`/products/${id}`)
                this.Products = this.Products.filter(c => c.id !== id)
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Product deletion failed'
                throw err
            } finally {
                this.loading = false
            }
        },

        async getProducts() {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null
            try {
                const response = await $axios.get('/products')
                this.Products = response.data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Failed to fetch categories'
                throw err
            } finally {
                this.loading = false
            }
        }
    }
})