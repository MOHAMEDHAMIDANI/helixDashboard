<template>
    <header class="h-16 shrink-0 flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 gap-3">
        <div class="flex items-center gap-3 min-w-0">
            <button @click="NavStore.toggleNav" type="button" aria-label="Toggle sidebar"
                class="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg :class="NavStore.NavIsOpen ? 'size-5' : 'size-5 rotate-180'" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M3 7.063h14c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H3c-.41 0-.75.34-.75.75s.34.75.75.75m0 6h10c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H3c-.41 0-.75.34-.75.75s.34.75.75.75m14 6H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h14c.41 0 .75.34.75.75s-.34.75-.75.75m3.55-2.15c.13.1.29.15.45.15v-.01c.23 0 .45-.11.6-.3c.25-.33.19-.8-.14-1.05l-1.15-.88c-1.59-1.2-2.55-1.94-2.55-2.52s.958-1.309 2.545-2.517l.005-.003l1.15-.88a.749.749 0 1 0-.91-1.19l-1.15.88l-.062.046c-1.98 1.51-3.078 2.347-3.078 3.674c0 1.337 1.106 2.177 3.13 3.712l.01.008z" />
                </svg>
            </button>
            <button @click="NavStore.toggleNav" type="button" aria-label="Toggle sidebar"
                class="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M5 17h14M5 12h14M5 7h14" />
                </svg>
            </button>

            <h1 class="font-semibold truncate text-gray-900 capitalize">
                {{useRoute().fullPath.split('/').filter(segment => isNaN(segment)).join(' > ') || 'Dashboard'}}
            </h1>
        </div>

        <div class="flex items-center gap-3 shrink-0">
            <button type="button" @click="notificationStore.toggleNotification"
                class="p-1.5 rounded-md hover:bg-gray-100 transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Notifications">
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M14.857 17.082a24 24 0 0 0 5.454-1.31A8.97 8.97 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.97 8.97 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.3 24.3 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <span class="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-600 ring-1 ring-white"></span>
            </button>

            <div class="relative">
                <button ref="addButton" @click="openAdd = !openAdd" type="button"
                    class="p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Add new" aria-haspopup="true" :aria-expanded="openAdd">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21" />
                    </svg>
                </button>

                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="openAdd"
                        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 origin-top-right">
                        <div class="py-1" role="menu" aria-orientation="vertical">
                            <nuxtLink :to="{ name: 'Product' }"
                                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem">
                                <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48">
                                    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                                        <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                                        <path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19" />
                                    </g>
                                </svg>
                                <span>New product</span>
                            </nuxtLink>

                            <nuxtLink :to="{ name: 'Users' }"
                                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500"
                                    viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                        <circle cx="12" cy="6" r="4" />
                                        <path stroke-linecap="round"
                                            d="M20.414 18.5H19m0 0h-1.414m1.414 0v-1.414m0 1.414v1.414M12 13c2.608 0 4.883.815 6.088 2.024m-2.504 5.413C14.536 20.794 13.31 21 12 21c-3.866 0-7-1.79-7-4c0-1.36 1.187-2.56 3-3.283" />
                                    </g>
                                </svg>
                                <span>New user</span>
                            </nuxtLink>

                            <!-- <nuxtLink :to="{ name: 'Category' }"
                                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem">
                                <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2"
                                        d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3h6m-3-3v6" />
                                </svg>
                                <span>New category</span>
                            </nuxtLink> -->
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const NavStore = useNavStore();
const notificationStore = useNotificationStore();
const openAdd = ref(false);
const addButton = ref<HTMLElement | null>(null);

onClickOutside(addButton, () => {
    openAdd.value = false;
});
</script>