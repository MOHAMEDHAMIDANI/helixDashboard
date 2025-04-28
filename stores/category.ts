import { defineStore } from 'pinia'
import type { Category } from '~/types'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [] as Category[],
        error: null as string | null,
        loading: false as boolean
    }),

    getters: {
        categoryNames: (state) => state.categories.map(c => c.categoryName),
        getCategoryById: (state) => (id: string) =>
            state.categories.find(c => c.id === id)
    },

    actions: {
        async initialize() {
            if (this.categories.length === 0) {
                await this.getCategories()
            }
        },

        async createCategory(name: string) {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null

            try {
                const response = await $axios.post('/category', { categoryName: name })
                this.categories.push(response.data)
                return response.data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Category creation failed'
                throw err
            } finally {
                this.loading = false
            }
        },
        async updateCategory(id: string, name: string) {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null
            try {
                const response = await $axios.patch(`/category/${id}`, { categoryName: name })
                const index = this.categories.findIndex(c => c.id === id)
                if (index !== -1) {
                    this.categories[index] = response.data
                }
                return response.data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Category update failed'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteCategory(id: string) {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null

            try {
                await $axios.delete(`/category/${id}`)
                this.categories = this.categories.filter(c => c.id !== id)
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Category deletion failed'
                throw err
            } finally {
                this.loading = false
            }
        },

        async getCategories() {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null

            try {
                const response = await $axios.get('/category')
                this.categories = response.data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Failed to fetch categories'
                throw err
            } finally {
                this.loading = false
            }
        }
    }
})