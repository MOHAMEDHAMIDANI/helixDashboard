<template>
    <MainLayout>
        <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
            <div
                class="w-80 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 transform">
                <div class="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
                    <div class="flex items-center gap-3">
                        <h1 class="font-semibold text-gray-900 dark:text-white">Orders</h1>
                        <span
                            class="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                            {{ pendingCount }}
                        </span>
                    </div>

                    <div class="relative">
                        <button @click="showFilters = !showFilters"
                            class="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <FilterIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>

                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <div v-if="showFilters"
                                class="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div class="p-2">
                                    <div class="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">Status
                                    </div>
                                    <div v-for="tab in tabs" :key="tab.value" @click="setFilter(tab.value)"
                                        class="px-3 py-2 text-sm rounded-md cursor-pointer flex items-center justify-between"
                                        :class="{
                                            'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300': filter === tab.value,
                                            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': filter !== tab.value
                                        }">
                                        <span>{{ tab.label }}</span>
                                        <span v-if="filter === tab.value">
                                            <CheckIcon class="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-100 dark:border-gray-800">
                    <div class="relative">
                        <input type="text" v-model="searchQuery" placeholder="Search orders..."
                            class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-500 dark:focus:border-blue-600 outline-none transition-all">
                        <SearchIcon class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto">
                    <!-- Loading State -->
                    <div v-if="isLoading" class="flex items-center justify-center h-full">
                        <div class="text-center">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading orders...</p>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="flex items-center justify-center h-full">
                        <div class="text-center p-6">
                            <XCircleIcon class="w-12 h-12 mx-auto text-red-500" />
                            <h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">Error loading orders</h3>
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ error }}</p>
                            <button @click="fetchOrders" class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Try Again
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else-if="filteredOrders.length === 0" class="flex items-center justify-center h-full">
                        <div class="text-center p-6">
                            <PackageIcon class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700" />
                            <h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">No orders found</h3>
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {{ searchQuery ? 'Try adjusting your search' : 'There are no orders to display' }}
                            </p>
                        </div>
                    </div>

                    <!-- Orders List -->
                    <div v-else>
                        <div v-for="order in filteredOrders" :key="order.id" 
                            @click="selectOrder(order)"
                            class="px-5 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
                            :class="{
                                'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500': selectedOrder?.id === order.id,
                                'opacity-70': order.status === 'canceled'
                            }">
                            <div class="flex justify-between items-start">
                                <div class="flex-1 pr-2">
                                    <div class="font-medium text-gray-900 dark:text-white mb-1">{{ shortOrderId(order.id) }}</div>
                                    <div class="text-sm text-gray-900 dark:text-white">{{ getCustomerName(order) }}</div>
                                </div>
                                <div class="text-right">
                                     <div class="flex items-center justify-end gap-2 mb-1">
                                        <span class="text-xs px-2 py-1 rounded-full flex items-center gap-1.5" :class="statusBadgeColor(order.status)">
                                             <component :is="statusIcon(order.status)" class="w-3 h-3" />
                                            {{ order.status }}
                                        </span>
                                        <span class="text-xs text-gray-400">{{ formatDate(order.createdAt) }}</span>
                                    </div>
                                    <div class="flex items-center justify-end gap-2 text-gray-500 dark:text-gray-400 mb-1">
                                        <PackageIcon class="w-4 h-4" />
                                        <p class="text-xs">
                                            {{ order.products?.length || 0 }} product{{ (order.products?.length || 0) > 1 ? 's' : '' }}
                                        </p>
                                    </div>
                                    <div class="text-sm font-medium" :class="{
                                        'text-gray-900 dark:text-white': order.status !== 'canceled',
                                        'text-gray-400 dark:text-gray-500': order.status === 'canceled'
                                    }">
                                        {{ formatCurrency(order.totalPrice) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100" leave-active-class="transition ease-in duration-200"
                leave-from-class="transform opacity-100" leave-to-class="transform opacity-0">
                <div class="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden" v-if="selectedOrder">
                    <div
                        class="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
                        <div class="flex items-center gap-4">
                            <button @click="selectedOrder = null; console.log('Close button clicked');"
                                class="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <XIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                            <div>
                                <h1 class="font-semibold text-gray-900 dark:text-white">Order #{{ selectedOrder.id }}
                                </h1>
                                <p class="text-xs text-gray-400">{{ formatDateTime(selectedOrder.createdAt) }}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs"
                                :class="statusBadgeColor(selectedOrder.status)">
                                <component :is="statusIcon(selectedOrder.status)" class="w-3.5 h-3.5" />
                                {{ selectedOrder.status }}
                            </div>

                            <div class="flex items-center gap-1">
                                <div class="relative">
                                    <button @click="showStatusMenu = !showStatusMenu"
                                        class="p-2 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <MoreVerticalIcon class="w-5 h-5" />
                                    </button>
                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <div v-if="showStatusMenu"
                                            class="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div class="py-1">
                                                <button @click="handleStatusUpdate('pending')"
                                                    class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <ClockIcon class="w-4 h-4 text-blue-500" />
                                                    <span>Mark as Pending</span>
                                                </button>
                                                <button @click="handleStatusUpdate('delivered')"
                                                    class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <TruckIcon class="w-4 h-4 text-green-500" />
                                                    <span>Mark as Delivered</span>
                                                </button>
                                                <button @click="handleStatusUpdate('completed')"
                                                    class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <CheckIcon class="w-4 h-4 text-green-500" />
                                                    <span>Mark as Completed</span>
                                                </button>
                                                <button @click="showCancelDialog = true"
                                                    class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <XIcon class="w-4 h-4" />
                                                    <span>Cancel Order</span>
                                                </button>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-auto">
                        <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">CUSTOMER INFORMATION</h3>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center gap-2">
                                    <p class="font-medium text-gray-900 dark:text-white">{{ getCustomerName(selectedOrder) }}</p>
                                </div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ getCustomerEmail(selectedOrder) }}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ getCustomerPhone(selectedOrder) }}</p>
                            </div>
                        </div>
                        <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">SHIPPING INFORMATION</h3>
                            <div class="space-y-3">
                                <div class="flex items-start gap-3">
                                    <div class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">
                                        <LocationIcon />
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedOrder.shipping?.address || 'N/A' }}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedOrder.shipping?.city || 'N/A' }}, {{ selectedOrder.shipping?.state || 'N/A' }} {{ selectedOrder.shipping?.zip || '' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-3">
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">ORDER ITEMS ({{ selectedOrder.products?.length || 0 }})</h3>

                            </div>
                            <div class="space-y-3">
                                <div v-for="(item, index) in selectedOrder.products || []" :key="index"
                                    class="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div class="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <img :src="'http://localhost:3000/uploads/Product/' + item.product?.image[0]" 
                                             :alt="item.nameAtOrder || 'Product Image'" 
                                             class="w-full h-full object-cover">
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.nameAtOrder || 'Unknown Product' }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">SKU: {{ item.product?.sku || 'N/A' }}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                                            {{ formatCurrency(item.priceAtOrder || 0) }}
                                        </p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Qty: {{ item.quantity || 0 }}</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white mt-2">
                                            {{ formatCurrency((item.priceAtOrder || 0) * (item.quantity || 0)) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">ORDER SUMMARY</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                                        <p class="text-sm text-gray-900 dark:text-white">{{ formatCurrency(selectedOrder.subtotal || 0) }}</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Shipping</p>
                                        <p class="text-sm text-gray-900 dark:text-white">{{ formatCurrency(selectedOrder.shipping?.cost || 0) }}</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Tax</p>
                                        <p class="text-sm text-gray-900 dark:text-white">{{ formatCurrency(selectedOrder.tax || 0) }}</p>
                                    </div>
                                    <div v-if="(selectedOrder.discount || 0) > 0" class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Discount</p>
                                        <p class="text-sm text-red-500">-{{ formatCurrency(selectedOrder.discount || 0) }}</p>
                                    </div>
                                    <div class="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">Total</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(selectedOrder.totalPrice || 0) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100" leave-active-class="transition ease-in duration-200"
                leave-from-class="transform opacity-100" leave-to-class="transform opacity-0">
                <div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900" v-if="!selectedOrder">
                    <div class="text-center p-6 max-w-md">
                        <PackageIcon class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700" />
                        <h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">No order selected</h3>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Select an order from the list to view
                            details</p>
                    </div>
                </div>
            </transition>

            <!-- Custom Cancel Confirmation Dialog -->
            <div v-if="showCancelDialog" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
                    <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full">
                        <XCircleIcon class="w-6 h-6 text-red-500 dark:text-red-400" />
                    </div>
                    <div class="mt-3 text-center">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Cancel Order</h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to cancel this order? This action cannot be undone.
                            </p>
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-2 gap-3">
                        <button type="button"
                            class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                            @click="showCancelDialog = false">
                            Go Back
                        </button>
                        <button type="button"
                            class="px-4 py-2 text-sm font-medium rounded-lg border border-transparent text-white bg-red-500 hover:bg-red-600 focus:outline-none transition-colors"
                            @click="cancelOrder(selectedOrder)">
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MainLayout from '~/layouts/mainLayout.vue'
import { useNotificationStore } from '~/stores/notifications'
import {
    Menu as MenuIcon,
    X as XIcon,
    Search as SearchIcon,
    Filter as FilterIcon,
    Package as PackageIcon,
    MapPin as LocationIcon,
    Truck as TruckIcon,
    Check as CheckIcon,
    Clock as ClockIcon,
    XCircle as XCircleIcon,
    Star as StarIcon,
    Maximize as MaximizeIcon,
    MoreVertical as MoreVerticalIcon,
    Circle as CircleIcon
} from 'lucide-vue-next'

const { $axios } = useNuxtApp()
const notificationStore = useNotificationStore()
const orders = ref([])
const filter = ref('all')
const searchQuery = ref('')
const selectedOrder = ref(null)
const showFilters = ref(false)
const showCancelDialog = ref(false)
const showItemsFullscreen = ref(false)
const showStatusMenu = ref(false)
const isLoading = ref(true)
const error = ref(null)

const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Completed', value: 'completed' },
    { label: 'Canceled', value: 'canceled' }
]

async function fetchOrders() {
    try {
        isLoading.value = true
        error.value = null
        const response = await $axios.get('/order')
        orders.value = response.data
        if (orders.value.length > 0) {
            selectedOrder.value = orders.value[0]
        } else {
            selectedOrder.value = null
        }
    } catch (err) {
        error.value = 'Failed to fetch orders'
        
    } finally {
        isLoading.value = false
    }
}
async function handleStatusUpdate(status) {
    if (!selectedOrder.value) return

    try {
        const response = await $axios.patch(`/order/${selectedOrder.value.id}/status`, { status })
        selectedOrder.value = response.data
        showStatusMenu.value = false
        const index = orders.value.findIndex(o => o.id === response.data.id)
        if (index !== -1) {
            orders.value[index] = response.data
        }
        notificationStore.add({
            type: 'success',
            message: `Order status updated to ${status}`,
            duration: 3000
        })
        if (status === 'delivered') {
            setTimeout(async () => {
                try {
                    const updatedResponse = await $axios.patch(`/order/${selectedOrder.value.id}/status`, { status: 'completed' })
                    selectedOrder.value = updatedResponse.data
                    const index = orders.value.findIndex(o => o.id === updatedResponse.data.id)
                    if (index !== -1) {
                        orders.value[index] = updatedResponse.data
                    }
                    notificationStore.add({
                        type: 'success',
                        message: 'Order automatically marked as completed',
                        duration: 3000
                    })
                } catch (err) {
                    
                    notificationStore.add({
                        type: 'error',
                        message: 'Failed to update order status',
                        duration: 3000
                    })
                }
            }, 86400000)
        }
    } catch (err) {
        
        notificationStore.add({
            type: 'error',
            message: 'Failed to update order status',
            duration: 3000
        })
    }
}
async function cancelOrder(order) {
    
    try {
        const response = await $axios.patch(`/order/${order.id}/status`, { status: 'canceled' })
        
        const index = orders.value.findIndex(o => o.id === response.data.id)
        if (index !== -1) {
            orders.value[index] = response.data
        }
        if (selectedOrder.value?.id === order.id) {
            selectedOrder.value = response.data;
        }

        showCancelDialog.value = false
        showStatusMenu.value = false

        notificationStore.add({
            type: 'success',
            message: `Order #${shortOrderId(order.id)} has been canceled.`,
            duration: 3000
        })

    } catch (err) {
        
        notificationStore.add({
            type: 'error',
            message: 'Failed to cancel order.',
            duration: 3000
        })
    }
}

function getCustomerName(order) {
    if (order.customer?.name) {
        return order.customer.name
    }
    return `${order.firstName || ''} ${order.familyName || ''}`.trim() || 'Unknown Customer'
}

function getCustomerEmail(order) {
    return order.customer?.email || 'No email provided'
}

function getCustomerPhone(order) {
    return order.customer?.phone || order.phoneNumber || 'No phone provided'
}

function getCustomerAvatar(order) {
    return order.customer?.avatar || '/default-avatar.png'
}
const filteredOrders = computed(() => {
    let result = orders.value

    if (filter.value !== 'all') {
        result = result.filter(order => order.status === filter.value)
    }

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.trim().toLowerCase()
        result = result.filter(order =>
            order.id.toString() === query ||
            order.id.toString().includes(query) ||
            getCustomerName(order).toLowerCase().includes(query) ||
            (order.email || '').toLowerCase().includes(query) ||
            order.shipping?.tracking?.toLowerCase().includes(query) ||
            order.products?.some(product =>
                product.nameAtOrder?.toLowerCase().includes(query) ||
                product.product?.name?.toLowerCase().includes(query) ||
                product.product?.sku?.toLowerCase().includes(query)
            )
        )
    }

    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const pendingCount = computed(() => {
    return orders.value.filter(order => order.status === 'pending').length
})

function setFilter(type) {
    filter.value = type
    showFilters.value = false
}

function selectOrder(order) {
    selectedOrder.value = order
    showStatusMenu.value = false
    console.log('Selected order:', selectedOrder.value);
    console.log('Selected order products:', selectedOrder.value?.products);
}

function statusColor(status) {
    return {
        'pending': 'bg-yellow-500',
        'delivered': 'bg-blue-500',
        'completed': 'bg-green-500',
        'canceled': 'bg-red-500'
    }[status] || 'bg-gray-400'
}

function statusBadgeColor(status) {
    return {
        'pending': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300',
        'delivered': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
        'completed': 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300',
        'canceled': 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
    }[status] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
}

function statusIcon(status) {
    return {
        'pending': ClockIcon,
        'delivered': TruckIcon,
        'completed': CheckIcon,
        'canceled': XCircleIcon
    }[status] || CircleIcon
}

function formatDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function formatDateTime(date) {
    if (!date) return ''
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function formatCurrency(amount) {
    if (typeof amount !== 'number') return ''
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

function shortOrderId(id) {
    if (!id) return ''
    return `#${id.slice(0, 6)}...${id.slice(-4)}`
}

onMounted(async () => {
    await fetchOrders()
})
</script>

<style>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

.dark ::-webkit-scrollbar-track {
    background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}


::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

.dark ::-webkit-scrollbar-track {
    background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}
</style>