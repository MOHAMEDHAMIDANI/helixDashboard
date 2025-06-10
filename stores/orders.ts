import { defineStore } from 'pinia'
import type { Order } from '~/types'

export const useOrderStore = defineStore('orders', {
    state: () => ({
        orders: [] as Order[],
        error: null as string | null,
        loading: false as boolean
    }),

    getters: {
        pendingOrders: (state) => state.orders.filter(order => order.status === 'pending'),
        deliveredOrders: (state) => state.orders.filter(order => order.status === 'delivered'),
        completedOrders: (state) => state.orders.filter(order => order.status === 'completed'),
        canceledOrders: (state) => state.orders.filter(order => order.status === 'canceled')
    },

    actions: {
        async getOrders() {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null
            try {
                const response = await $axios.get('/orders')
                this.orders = response.data
                return this.orders
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Failed to fetch orders'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateOrderStatus(orderId: string, status: string) {
            const { $axios } = useNuxtApp()
            this.loading = true
            this.error = null
            try {
                const response = await $axios.patch(`/orders/${orderId}/status`, { status })
                const updatedOrder = response.data
                const index = this.orders.findIndex(order => order.id === orderId)
                if (index !== -1) {
                    this.orders[index] = updatedOrder
                }
                return updatedOrder
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Failed to update order status'
                throw err
            } finally {
                this.loading = false
            }
        },

        async cancelOrder(orderId: string) {
            return this.updateOrderStatus(orderId, 'canceled')
        }
    }
}) 