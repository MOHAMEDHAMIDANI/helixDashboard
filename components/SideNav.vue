<template>
    <div :class="[
        'duration-300 ease-in-out lg:flex hidden flex-col min-h-svh shrink-0 border-r border-gray-200 bg-white',
        NavStore.NavIsOpen ? 'w-64' : 'w-16'
    ]">
    <div class="shrink-0 flex items-center justify-center px-2 border-b border-gray-200 h-16">
            <button type="button"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-full"
                @click="NavStore.toggleNav">
                                <svg v-if="!NavStore.NavIsOpen" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                     class="h-8 w-8">
                    <defs>
                        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#4F46E5"/>
                            <stop offset="100%" stop-color="#06B6D4"/>
                        </linearGradient>
                    </defs>
                    <text x="50%" y="60%" 
                          font-family="'Inter', sans-serif"
                          font-size="20" 
                          font-weight="700"
                          text-anchor="middle"
                          fill="url(#iconGradient)">H</text>
                </svg>
                                <svg v-else viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-full h-8">
                    <defs>
                        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#4F46E5"/>
                            <stop offset="50%" stop-color="#2563EB"/>
                            <stop offset="100%" stop-color="#06B6D4"/>
                        </linearGradient>
                    </defs>
                    <text x="0" y="45" 
                          font-family="'Inter', sans-serif" 
                          font-size="36" 
                          font-weight="700"
                          fill="url(#textGradient)">Hilex Dashboard</text>
                </svg>
            </button>
        </div>

        <div class="flex flex-col gap-1 flex-1 overflow-y-auto px-2 py-4">
            <nav aria-label="Main" class="flex flex-col gap-1">
                <nuxtLink :to="{ name: 'index' }" class="flex items-center p-2 rounded-lg transition-colors"
                    :class="[
                        NavStore.NavIsOpen ? 'justify-start' : 'justify-center',
                        isActive('index') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    ]"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15 20v-7h7v7zm-4-9V4h11v7zm-9 9v-7h11v7zm0-9V4h7v7z" />
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Dashboard</span>
                </nuxtLink>

                <nuxtLink :to="{ name: 'Inbox' }"
                    class="flex items-center p-2 rounded-lg transition-colors"
                    :class="[
                        NavStore.NavIsOpen ? 'justify-start' : 'justify-center',
                        isActive('Inbox') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" />
                            <path stroke-linecap="round"
                                d="M2 13h3.16c.905 0 1.358 0 1.756.183s.692.527 1.281 1.214l.606.706c.589.687.883 1.031 1.281 1.214s.85.183 1.756.183h.32c.905 0 1.358 0 1.756-.183s.692-.527 1.281-1.214l.606-.706c.589-.687.883-1.031 1.281-1.214S17.934 13 18.84 13H22" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="flex-1 ml-3">Inbox</span>
                    <span v-if="NavStore.NavIsOpen" class="text-xs px-1.5 py-0.5 rounded-full bg-gray-200">{{ notificationStore.unreadCount }}</span>
                </nuxtLink>

                <nuxtLink :to="{ name: 'Product' }"
                    class="flex items-center p-2 rounded-lg transition-colors"
                    :class="[
                        NavStore.NavIsOpen ? 'justify-start' : 'justify-center',
                        isActive('Product') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 48 48">
                        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                            <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                            <path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Products</span>
                </nuxtLink>

                <nuxtLink :to="{ name: 'Orders' }"
                    class="flex items-center p-2 rounded-lg transition-colors"
                    :class="[
                        NavStore.NavIsOpen ? 'justify-start' : 'justify-center',
                        isActive('Orders') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M4 18V7.1L2.45 3.75q-.175-.375-.025-.763t.525-.562t.763-.037t.562.512L6.2 7.05h11.6l1.925-4.15q.175-.375.563-.525t.762.05q.375.175.525.563t-.025.762L20 7.1V18q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m6-5h4q.425 0 .713-.288T15 12t-.288-.712T14 11h-4q-.425 0-.712.288T9 12t.288.713T10 13" />
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Orders</span>
                </nuxtLink>
                <NuxtLink :to="{ name: 'index' }"
                    class="flex items-center p-2 rounded-lg transition-colors"
                    :class="[
                        NavStore.NavIsOpen ? 'justify-start' : 'justify-center',
                        isActive('index') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5">
                            <path
                                d="M7 18v-2m5 2v-3m5 3v-5M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                            <path
                                d="M5.992 11.486c2.155.072 7.042-.253 9.822-4.665m-1.822-.533l1.876-.302c.228-.029.564.152.647.367l.495 1.638" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Analytics</span>
                </NuxtLink>
            </nav>
        </div>

        <div class="shrink-0 flex items-center p-2 border-t border-gray-200">
            <nuxtLink :to="{ name: 'Profile' }"  type="button" class="flex items-center p-1 rounded-lg hover:bg-gray-100 transition-colors w-full"
                :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                <img :src="`${backendUrl}/uploads/Profile/`+ authStore.user?.avatar" alt="Profile" class="h-8 w-8 rounded-full">
                <div v-if="NavStore.NavIsOpen" class="text-left ml-3">
                    <p class="text-sm font-medium text-gray-800">{{ authStore.user?.fullName }}</p>
                </div>
            </nuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNavStore } from '~/stores/navStore'
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notifications'
import { useRoute, useRouter } from 'vue-router'

const NavStore = useNavStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const route = useRoute()
const router = useRouter()

const backendUrl = computed(() => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
})

const isActive = (name: string) => {
    return route.name === name
}
</script>