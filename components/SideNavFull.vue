<template>
    <transition name="fade">
        <div v-if="NavStore.NavIsOpen" class="fixed inset-0 bg-black/75 z-40 lg:hidden"
            @click="NavStore.NavIsOpen = false" aria-hidden="true" role="presentation" />
    </transition>
    <transition name="slide">
        <div v-if="NavStore.NavIsOpen" ref="NavBarFull"
            class="fixed bg-white divide-y divide-gray-200 shadow-lg flex flex-col left-0 inset-y-0 w-full max-w-md z-50 lg:hidden"
            @click.stop>
            <div class="h-16 shrink-0 flex items-center gap-3 px-6">
                <button type="button" aria-label="Close sidebar" class="rounded-lg p-1.5 hover:bg-gray-100"
                    @click="NavStore.NavIsOpen = false">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M7 7l10 10">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0" />
                            </path>
                            <path d="M17 7l-10 10">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s"
                                    values="16;0" />
                            </path>
                        </g>
                    </svg>
                </button>

                <!-- Mobile Logo with Gradient -->
                <div class="flex items-center gap-2 w-full py-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6">
                        <defs>
                            <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#4F46E5" />
                                <stop offset="100%" stop-color="#06B6D4" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span
                        class="text-lg font-semibold truncate capitalize bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                        Hilex Dashboard
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-6 py-4">
                <button type="button"
                    class="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5"
                        viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined -->
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5"
                            d="m14 14l2.5 2.5m-.067 2.025a1.48 1.48 0 1 1 2.092-2.092l3.042 3.042a1.48 1.48 0 1 1-2.092 2.092zM16 9A7 7 0 1 0 2 9a7 7 0 0 0 14 0"
                            color="currentColor" />
                    </svg>
                    <span class="truncate">Search...</span>
                    <div class="hidden lg:flex items-center gap-1 ms-auto">
                        <kbd class="px-1 rounded text-xs border border-gray-300 bg-gray-100 h-5">⊞</kbd>
                        <kbd class="px-1 rounded text-xs border border-gray-300 bg-gray-100 h-5">K</kbd>
                    </div>
                </button>

                <nav aria-label="Main" class="flex flex-col gap-1">
                    <nuxtLink :to="{ name: 'index' }"
                        class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-blue-600 bg-blue-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15 20v-7h7v7zm-4-9V4h11v7zm-9 9v-7h11v7zm0-9V4h7v7z" />
                        </svg>
                        <span class="truncate capitalize">dashboard</span>
                    </nuxtLink>

                    <nuxtLink :to="{ name: 'Inbox' }"
                        class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-width="1.5">
                                <path
                                    d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" />
                                <path stroke-linecap="round"
                                    d="M2 13h3.16c.905 0 1.358 0 1.756.183s.692.527 1.281 1.214l.606.706c.589.687.883 1.031 1.281 1.214s.85.183 1.756.183h.32c.905 0 1.358 0 1.756-.183s.692-.527 1.281-1.214l.606-.706c.589-.687.883-1.031 1.281-1.214S17.934 13 18.84 13H22" />
                            </g>
                        </svg>
                        <span class="truncate capitalize">Inbox</span>
                        <span class="ms-auto text-xs px-1.5 py-0.5 rounded border border-gray-200 bg-white">4</span>
                    </nuxtLink>
                    <nuxtLink :to="{ name: 'Product' }"
                        class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 48 48">
                            <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                                <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                                <path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19" />
                            </g>
                        </svg>
                        <span class="truncate capitalize">Products</span>
                    </nuxtLink>
                    <nuxtLink :to="{ name: 'Orders' }"
                        class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M4 18V7.1L2.45 3.75q-.175-.375-.025-.763t.525-.562t.763-.037t.562.512L6.2 7.05h11.6l1.925-4.15q.175-.375.563-.525t.762.05q.375.175.525.563t-.025.762L20 7.1V18q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m6-5h4q.425 0 .713-.288T15 12t-.288-.712T14 11h-4q-.425 0-.712.288T9 12t.288.713T10 13" />
                        </svg>
                        <span class="truncate capitalize">Orders</span>
                    </nuxtLink>
                    <nuxtLink :to="{ name: 'Profile' }"
                        class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5"
                            viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" color="currentColor">
                                <path
                                    d="M7 18v-2m5 2v-3m5 3v-5M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                                <path
                                    d="M5.992 11.486c2.155.072 7.042-.253 9.822-4.665m-1.822-.533l1.876-.302c.228-.029.564.152.647.367l.495 1.638" />
                            </g>
                        </svg>
                        <span class="truncate capitalize">Analytics</span>
                    </nuxtLink>
                </nav>


            </div>

            <div class="shrink-0  px-6 py-3 border-t border-gray-200">
                <nuxtLink :to="{ name: 'Profile' }" type="button"
                    class="cursor-pointer duration-300 flex items-center gap-3 w-full px-3 py-1.5 rounded-lg hover:bg-gray-100">
                    <img :src="'http://localhost:3000/uploads/Profile/' + authStore.user?.avatar" alt="Profile" class="h-5 w-5 rounded-full">
                    <span class="truncate">{{ authStore.user?.fullName }}</span>
                </nuxtLink>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { onClickOutside, useMediaQuery } from '@vueuse/core'
const NavStore = useNavStore()
const authStore = useAuthStore()
const route = useRoute()
const NavBarFull = ref<HTMLElement | null>(null)

const isMobile = computed(() => window.innerWidth < 1024)

const handleKeydown = (e: KeyboardEvent) => {
    if (NavStore.NavIsOpen && e.key === 'Escape') {
        NavStore.NavIsOpen = false
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

onClickOutside(NavBarFull, () => {
    if (isMobile.value) {
        NavStore.NavIsOpen = false
    }
})
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>