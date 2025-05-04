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

        async deleteCategory(id: string, index: number) {
            const { $axios } = useNuxtApp();
            this.loading = true;
            this.error = null;
            try {
                console.log('Deleting category in store with id:', id, 'at index:', index);
                await $axios.delete(`/category/${id}`);
                if (index >= 0 && index < this.categories.length) {
                    this.categories.splice(index, 1);
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Category deletion failed';
                throw err;
            } finally {
                this.loading = false;
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