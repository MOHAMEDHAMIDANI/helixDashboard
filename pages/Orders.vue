<template>
    <MainLayout>
        <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
            <!-- Orders Sidebar -->
            <div
                class="w-80 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 transform">
                <!-- Header -->
                <div class="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
                    <div class="flex items-center gap-3">
                        <button
                            class="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors lg:hidden">
                            <MenuIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
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

                        <!-- Filter Dropdown -->
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

                <!-- Search -->
                <div class="p-3 border-b border-gray-100 dark:border-gray-800">
                    <div class="relative">
                        <input type="text" v-model="searchQuery" placeholder="Search orders..."
                            class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-500 dark:focus:border-blue-600 outline-none transition-all">
                        <SearchIcon class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                </div>

                <!-- Order List -->
                <div class="flex-1 overflow-y-auto">
                    <div v-for="order in filteredOrders" :key="order.id" @click="selectOrder(order)"
                        class="px-5 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
                        :class="{
                            'bg-blue-50 dark:bg-blue-900/20': selectedOrder?.id === order.id,
                            'opacity-70': order.status === 'canceled'
                        }">
                        <div class="flex justify-between items-start mb-1">
                            <div class="flex items-center gap-2">
                                <span class="font-medium text-gray-900 dark:text-white">
                                    #{{ order.id }}
                                </span>
                                <span class="w-2 h-2 rounded-full animate-pulse" :class="statusColor(order.status)"
                                    v-if="order.status === 'pending'"></span>
                                <span class="w-2 h-2 rounded-full" :class="statusColor(order.status)" v-else></span>
                            </div>
                            <span class="text-xs text-gray-400">{{ formatDate(order.date) }}</span>
                        </div>
                        <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {{ order.customer.name }}
                        </h3>
                        <div class="flex justify-between items-center mt-1">
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ order.items.length }} item{{ order.items.length > 1 ? 's' : '' }}
                            </p>
                            <p class="text-sm font-medium" :class="{
                                'text-gray-900 dark:text-white': order.status !== 'canceled',
                                'text-gray-400 dark:text-gray-500': order.status === 'canceled'
                            }">
                                {{ formatCurrency(order.total) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Details -->
            <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100" leave-active-class="transition ease-in duration-200"
                leave-from-class="transform opacity-100" leave-to-class="transform opacity-0">
                <div class="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden" v-if="selectedOrder">
                    <!-- Order Header -->
                    <div
                        class="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
                        <div class="flex items-center gap-4">
                            <button @click="selectedOrder = null"
                                class="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors lg:hidden">
                                <XIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                            <div>
                                <h1 class="font-semibold text-gray-900 dark:text-white">Order #{{ selectedOrder.id }}
                                </h1>
                                <p class="text-xs text-gray-400">{{ formatDateTime(selectedOrder.date) }}</p>
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

                                    <!-- Status Dropdown Menu -->
                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <div v-if="showStatusMenu"
                                            class="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div class="py-1">
                                                <button @click="updateOrderStatus('pending')"
                                                    class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <ClockIcon class="w-4 h-4 text-blue-500" />
                                                    <span>Mark as Pending</span>
                                                </button>
                                                <button @click="updateOrderStatus('delivered')"
                                                    class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <TruckIcon class="w-4 h-4 text-green-500" />
                                                    <span>Mark as Delivered</span>
                                                </button>
                                                <button @click="updateOrderStatus('completed')"
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

                    <!-- Main Content -->
                    <div class="flex-1 overflow-y-auto">
                        <!-- Customer Card -->
                        <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">CUSTOMER</h3>
                            </div>
                            <div class="flex items-start gap-4">
                                <div class="relative">
                                    <div
                                        class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                                        <img :src="selectedOrder.customer.avatar" :alt="selectedOrder.customer.name"
                                            class="w-full h-full object-cover">
                                    </div>
                                    <span v-if="selectedOrder.customer.isVIP"
                                        class="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-0.5">
                                        <StarIcon class="w-3 h-3" />
                                    </span>
                                </div>
                                <div class="min-w-0">
                                    <div class="flex items-center gap-2">
                                        <p class="font-medium text-gray-900 dark:text-white">{{
                                            selectedOrder.customer.name }}</p>
                                        <span v-if="selectedOrder.customer.orders > 5"
                                            class="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                            Regular
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{
                                        selectedOrder.customer.email }}</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedOrder.customer.phone
                                    }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Shipping Info -->
                        <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">SHIPPING INFORMATION
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-start gap-3">
                                    <div class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">
                                        <LocationIcon />
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">Shipping Address
                                        </p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{
                                            selectedOrder.shipping.address }}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{
                                            selectedOrder.shipping.city }}, {{ selectedOrder.shipping.state }} {{
                                                selectedOrder.shipping.zip }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Order Items -->
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-3">
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">ORDER ITEMS ({{
                                    selectedOrder.items.length }})</h3>
                                <button
                                    class="text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center gap-1"
                                    @click="showItemsFullscreen = true">
                                    <MaximizeIcon class="w-3.5 h-3.5" />
                                    Fullscreen
                                </button>
                            </div>
                            <div class="space-y-3">
                                <div v-for="(item, index) in selectedOrder.items" :key="index"
                                    class="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div
                                        class="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                                        <span v-if="item.discount"
                                            class="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">
                                            -{{ item.discount }}%
                                        </span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ item.variant }}</p>
                                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">SKU: {{ item.sku }}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="flex items-center justify-end gap-1">
                                            <p class="text-sm font-medium text-gray-900 dark:text-white"
                                                v-if="item.originalPrice">
                                                {{ formatCurrency(item.price) }}
                                            </p>
                                            <p class="text-xs line-through text-gray-400" v-if="item.originalPrice">
                                                {{ formatCurrency(item.originalPrice) }}
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 dark:text-white" v-else>
                                                {{ formatCurrency(item.price) }}
                                            </p>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Qty: {{ item.quantity
                                        }}</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white mt-2">
                                            {{ formatCurrency(item.price * item.quantity) }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Order Summary -->
                            <div class="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">ORDER SUMMARY</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                                        <p class="text-sm text-gray-900 dark:text-white">{{
                                            formatCurrency(selectedOrder.subtotal) }}</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Shipping</p>
                                        <p class="text-sm text-gray-900 dark:text-white">{{
                                            formatCurrency(selectedOrder.shipping.cost) }}</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Tax</p>
                                        <p class="text-sm text-gray-900 dark:text-white">{{
                                            formatCurrency(selectedOrder.tax) }}</p>
                                    </div>
                                    <div v-if="selectedOrder.discount > 0" class="flex justify-between">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Discount</p>
                                        <p class="text-sm text-red-500">-{{ formatCurrency(selectedOrder.discount) }}
                                        </p>
                                    </div>
                                    <div
                                        class="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">Total</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{
                                            formatCurrency(selectedOrder.total) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Empty State -->
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

            <!-- Cancel Order Dialog -->
            <Modal :show="showCancelDialog" @close="showCancelDialog = false">
                <div class="p-6">
                    <div
                        class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full">
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
            </Modal>

            <!-- Items Fullscreen Modal -->
            <Modal :show="showItemsFullscreen" @close="showItemsFullscreen = false" size="xl">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Order Items</h3>
                        <button @click="showItemsFullscreen = false"
                            class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <XIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    <div class="overflow-y-auto max-h-[70vh]">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Product</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Price</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Qty</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="(item, index) in selectedOrder?.items" :key="index">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-10 w-10 rounded-md" :src="item.image" :alt="item.name" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900 dark:text-white">{{
                                                    item.name }}</div>
                                                <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.variant }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900 dark:text-white">{{ formatCurrency(item.price)
                                        }}</div>
                                        <div v-if="item.originalPrice" class="text-xs text-gray-500 line-through">{{
                                            formatCurrency(item.originalPrice) }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{
                                        item.quantity }}</td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {{ formatCurrency(item.price * item.quantity) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MainLayout from '~/layouts/mainLayout.vue'
import Modal from '~/components/Modal.vue'
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
    MoreVertical as MoreVerticalIcon
} from 'lucide-vue-next'

// Sample data
const orders = ref([
    {
        id: 1001,
        date: new Date(2024, 0, 15, 10, 30),
        status: 'pending',
        customer: {
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            phone: "(555) 123-4567",
            avatar: "https://i.pravatar.cc/128?u=1",
            joinDate: new Date(2023, 5, 12),
            orders: 8,
            totalSpent: 1250.75,
            isVIP: true
        },
        shipping: {
            method: "Express Shipping",
            cost: 12.99,
            address: "123 Main St, Apt 4B",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States",
            tracking: "SH123456789"
        },
        payment: {
            method: "Credit Card (VISA ****4242)",
            status: "paid"
        },
        subtotal: 187.96,
        tax: 15.04,
        discount: 10.00,
        total: 205.99,
        items: [
            {
                id: 1,
                sku: "PROD001-BL",
                name: "Premium Wireless Headphones",
                variant: "Black",
                price: 149.99,
                originalPrice: 179.99,
                discount: 20,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
            },
            {
                id: 2,
                sku: "PROD045-RD",
                name: "Bluetooth Speaker",
                variant: "Red",
                price: 37.97,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200"
            }
        ]
    },
    {
        id: 1002,
        date: new Date(2024, 0, 14, 14, 15),
        status: 'delivered',
        customer: {
            name: "Sarah Williams",
            email: "sarah.w@example.com",
            phone: "(555) 987-6543",
            avatar: "https://i.pravatar.cc/128?u=2",
            joinDate: new Date(2023, 8, 22),
            orders: 3,
            totalSpent: 450.50,
            isVIP: false
        },
        shipping: {
            method: "Standard Shipping",
            cost: 5.99,
            address: "456 Oak Avenue",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "United States",
            tracking: "SH987654321"
        },
        payment: {
            method: "PayPal",
            status: "paid"
        },
        subtotal: 89.97,
        tax: 7.20,
        total: 103.16,
        items: [
            {
                id: 3,
                sku: "PROD012-WH",
                name: "Smart Watch",
                variant: "White",
                price: 89.97,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
            }
        ]
    },
    {
        id: 1003,
        date: new Date(2024, 0, 13, 9, 45),
        status: 'completed',
        customer: {
            name: "Michael Brown",
            email: "michael.b@example.com",
            phone: "(555) 456-7890",
            avatar: "https://i.pravatar.cc/128?u=3",
            joinDate: new Date(2022, 11, 5),
            orders: 15,
            totalSpent: 3200.25,
            isVIP: true
        },
        shipping: {
            method: "Free Shipping",
            cost: 0,
            address: "789 Pine Road",
            city: "Chicago",
            state: "IL",
            zip: "60601",
            country: "United States",
            tracking: ""
        },
        payment: {
            method: "Credit Card (MC ****5555)",
            status: "paid"
        },
        subtotal: 239.94,
        tax: 19.20,
        total: 259.14,
        items: [
            {
                id: 4,
                sku: "PROD078-SV",
                name: "Gaming Console",
                variant: "Silver",
                price: 199.99,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=200"
            },
            {
                id: 5,
                sku: "PROD079-BK",
                name: "Controller",
                variant: "Black",
                price: 39.95,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200"
            }
        ]
    },
    {
        id: 1004,
        date: new Date(2024, 0, 12, 16, 20),
        status: 'canceled',
        customer: {
            name: "Emily Davis",
            email: "emily.d@example.com",
            phone: "(555) 789-0123",
            avatar: "https://i.pravatar.cc/128?u=4",
            joinDate: new Date(2023, 2, 18),
            orders: 2,
            totalSpent: 180.75,
            isVIP: false
        },
        shipping: {
            method: "Express Shipping",
            cost: 12.99,
            address: "321 Elm Street",
            city: "Houston",
            state: "TX",
            zip: "77001",
            country: "United States",
            tracking: "SH456123789"
        },
        payment: {
            method: "Apple Pay",
            status: "refunded"
        },
        subtotal: 59.98,
        tax: 4.80,
        total: 77.77,
        items: [
            {
                id: 6,
                sku: "PROD023-BL",
                name: "Wireless Earbuds",
                variant: "Blue",
                price: 59.98,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200"
            }
        ]
    }
])

// Tabs configuration
const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Completed', value: 'completed' },
    { label: 'Canceled', value: 'canceled' }
]

// State
const filter = ref('all')
const searchQuery = ref('')
const selectedOrder = ref(null)
const showFilters = ref(false)
const showCancelDialog = ref(false)
const showItemsFullscreen = ref(false)
const showStatusMenu = ref(false)

// Computed
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
            order.customer.name.toLowerCase().includes(query) ||
            order.customer.email.toLowerCase().includes(query) ||
            order.shipping.tracking?.toLowerCase().includes(query) ||
            order.items.some(item =>
                item.name.toLowerCase().includes(query) ||
                item.sku.toLowerCase().includes(query)
            )
        )
    }

    return result.sort((a, b) => b.date - a.date)
})
const pendingCount = computed(() => {
    return orders.value.filter(order => order.status === 'pending').length
})

// Methods
function setFilter(type) {
    filter.value = type
    showFilters.value = false
}

function selectOrder(order) {
    selectedOrder.value = order
    showStatusMenu.value = false
}

function updateOrderStatus(status) {
    if (selectedOrder.value) {
        selectedOrder.value.status = status
        showStatusMenu.value = false

        if (status === 'delivered') {
            // Auto-complete after some time
            setTimeout(() => {
                if (selectedOrder.value.status === 'delivered') {
                    selectedOrder.value.status = 'completed'
                }
            }, 86400000) // 24 hours
        }
    }
}

function cancelOrder(order) {
    order.status = 'canceled'
    if (order.payment.status === 'paid') {
        order.payment.status = 'refunded'
    }
    showCancelDialog.value = false
    showStatusMenu.value = false
}

function statusColor(status) {
    return {
        'pending': 'bg-blue-500',
        'delivered': 'bg-green-500',
        'completed': 'bg-green-500',
        'canceled': 'bg-red-500'
    }[status] || 'bg-gray-400'
}

function statusBadgeColor(status) {
    return {
        'pending': 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
        'delivered': 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300',
        'completed': 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300',
        'canceled': 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300'
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
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function formatDateTime(date) {
    if (!date) return ''
    return date.toLocaleString('en-US', {
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
        currency: 'USD'
    }).format(amount)
}

// Initialize with first order selected (for demo purposes)
onMounted(() => {
    if (orders.value.length > 0) {
        selectOrder(orders.value[0])
    }
})
</script>

<style>
/* Custom scrollbar */
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


/* Custom scrollbar */
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