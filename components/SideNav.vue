<template>
    <div :class="[
        'duration-300 ease-in-out lg:flex hidden flex-col min-h-svh shrink-0 border-r border-gray-200 bg-white',
        NavStore.NavIsOpen ? 'w-64' : 'w-16'
    ]">
        <!-- Logo/Header -->
        <div class="h-16 shrink-0 flex items-center justify-center px-2 border-b border-gray-200">
            <button type="button"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-full"
                @click="NavStore.toggleNav">
                <img src="https://github.com/nuxt.png" alt="Nuxt" class="h-8 w-8 rounded-full">
                <span v-if="NavStore.NavIsOpen" class="font-semibold text-gray-800 ml-2">Nuxt Admin</span>
            </button>
        </div>

        <!-- Main Navigation -->
        <div class="flex flex-col gap-1 flex-1 overflow-y-auto px-2 py-4">
            <!-- Search -->
            <button type="button"
                class="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5"
                    viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined -->
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="m14 14l2.5 2.5m-.067 2.025a1.48 1.48 0 1 1 2.092-2.092l3.042 3.042a1.48 1.48 0 1 1-2.092 2.092zM16 9A7 7 0 1 0 2 9a7 7 0 0 0 14 0"
                        color="currentColor" />
                </svg>
                <span v-if="NavStore.NavIsOpen" class="text-sm ml-3">Search</span>
            </button>

            <!-- Main Links -->
            <nav aria-label="Main" class="flex flex-col gap-1 mt-2">
                <a href="/" class="flex items-center p-2 rounded-lg transition-colors"
                    :class="NavStore.NavIsOpen ? 'text-blue-600 bg-blue-50 justify-start' : 'text-gray-600 hover:bg-gray-100 justify-center'"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15 20v-7h7v7zm-4-9V4h11v7zm-9 9v-7h11v7zm0-9V4h7v7z" />
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Dashboard</span>
                </a>

                <a href="/inbox"
                    class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" />
                            <path stroke-linecap="round"
                                d="M2 13h3.16c.905 0 1.358 0 1.756.183s.692.527 1.281 1.214l.606.706c.589.687.883 1.031 1.281 1.214s.85.183 1.756.183h.32c.905 0 1.358 0 1.756-.183s.692-.527 1.281-1.214l.606-.706c.589-.687.883-1.031 1.281-1.214S17.934 13 18.84 13H22" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="flex-1 ml-3">Inbox</span>
                    <span v-if="NavStore.NavIsOpen" class="text-xs px-1.5 py-0.5 rounded-full bg-gray-200">4</span>
                </a>

                <a href="/customers"
                    class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 14 14">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9.284 3.503a1.621 1.621 0 1 0 3.242 0a1.621 1.621 0 1 0-3.242 0" />
                            <path
                                d="M8.473 8.367v-.81a2.432 2.432 0 0 1 4.865 0v.81M6.6 8.369h6.738M3.604 5.612a1.712 1.712 0 1 0 0-3.425a1.712 1.712 0 0 0 0 3.425" />
                            <path
                                d="M6.6 8.609a2.996 2.996 0 1 0-5.993 0v1.284h1.285l.428 3.424h2.568l.428-3.424H6.6z" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Customers</span>
                </a>

                <a href="/products"
                    class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 48 48">
                        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                            <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                            <path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Products</span>
                </a>

                <a href="/categories"
                    class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2">
                            <circle cx="17" cy="7" r="3" />
                            <circle cx="7" cy="17" r="3" />
                            <path
                                d="M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                        </g>
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Categories</span>
                </a>

                <a href="/orders"
                    class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M4 18V7.1L2.45 3.75q-.175-.375-.025-.763t.525-.562t.763-.037t.562.512L6.2 7.05h11.6l1.925-4.15q.175-.375.563-.525t.762.05q.375.175.525.563t-.025.762L20 7.1V18q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m6-5h4q.425 0 .713-.288T15 12t-.288-.712T14 11h-4q-.425 0-.712.288T9 12t.288.713T10 13" />
                    </svg>
                    <span v-if="NavStore.NavIsOpen" class="ml-3">Orders</span>
                </a>

                <a href="/analytics"
                    class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
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
                </a>
            </nav>
        </div>

        <!-- User Profile -->
        <div class="shrink-0 flex items-center p-2 border-t border-gray-200">
            <button type="button" class="flex items-center p-1 rounded-lg hover:bg-gray-100 transition-colors w-full"
                :class="NavStore.NavIsOpen ? 'justify-start' : 'justify-center'">
                <img src="https://github.com/benjamincanac.png" alt="Benjamin Canac" class="h-8 w-8 rounded-full">
                <div v-if="NavStore.NavIsOpen" class="text-left ml-3">
                    <p class="text-sm font-medium text-gray-800">Benjamin Canac</p>
                    <p class="text-xs text-gray-500">Admin</p>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const NavStore = useNavStore()
</script>