<template>
    <div class="h-[calc(var(--spacing)_*_16)] shrink-0 flex items-center justify-between border-b px-4 sm:px-6 gap-1.5"
        style="--ui-header-height: calc(var(--spacing) * 16); border-color: var(--ui-border);">
        <div class="flex items-center gap-1.5 min-w-0">
            <button @click="NavStore.toggleNav" type="button"
                :aria-label="NavStore.NavIsOpen ? 'Close sidebar' : 'Open sidebar'"
                class="rounded-[calc(var(--rounded-sm)_*_1.5)] hidden font-medium lg:inline-flex items-center p-1.5 text-sm gap-1.5 transition-colors focus:outline-none focus-visible:bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-elevated)] text-[var(--ui-text)] disabled:opacity-75 aria-disabled:opacity-75 disabled:cursor-not-allowed aria-disabled:cursor-not-allowed"
                :class="NavStore.NavIsOpen ? '' : 'hidden lg:flex'">
                <svg :class="NavStore.NavIsOpen ? 'size-5' : 'size-5 rotate-180'" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M3 7.063h14c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H3c-.41 0-.75.34-.75.75s.34.75.75.75m0 6h10c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H3c-.41 0-.75.34-.75.75s.34.75.75.75m14 6H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h14c.41 0 .75.34.75.75s-.34.75-.75.75m3.55-2.15c.13.1.29.15.45.15v-.01c.23 0 .45-.11.6-.3c.25-.33.19-.8-.14-1.05l-1.15-.88c-1.59-1.2-2.55-1.94-2.55-2.52s.958-1.309 2.545-2.517l.005-.003l1.15-.88a.749.749 0 1 0-.91-1.19l-1.15.88l-.062.046c-1.98 1.51-3.078 2.347-3.078 3.674c0 1.337 1.106 2.177 3.13 3.712l.01.008z" />
                </svg>
            </button>
            <button @click="NavStore.toggleNav" type="button"
                class="rounded-[calc(var(--rounded-sm)_*_1.5)] lg:hidden font-medium inline-flex items-center p-1.5 text-sm gap-1.5 transition-colors focus:outline-none focus-visible:bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-elevated)] text-[var(--ui-text)] disabled:opacity-75 aria-disabled:opacity-75 disabled:cursor-not-allowed aria-disabled:cursor-not-allowed"
                :class="NavStore.NavIsOpen ? '' : 'hidden lg:hidden'">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-7"
                    viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 17h14M5 12h14M5 7h14" />
                </svg>
            </button>
            <h1 class="font-semibold truncate text-[var(--ui-text-highlighted)] flex items-center gap-1.5">Home</h1>
        </div>
        <div class="flex items-center shrink-0 gap-3">
            <button type="button" @click="notificationStore.toggleNotification"
                class="inline-flex items-center p-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 transition">
                <div class="relative flex items-center justify-center">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M14.857 17.082a24 24 0 0 0 5.454-1.31A8.97 8.97 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.97 8.97 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.3 24.3 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <span
                        class="absolute top-0 right-0 h-2 min-w-[0.5rem] text-[7px] p-0.5 rounded-full bg-red-600 text-white flex items-center justify-center ring-1 ring-white dark:ring-gray-900"></span>
                </div>
            </button>

            <button ref="NotificationBtn" @click="openAdd = !openAdd" type="button"
                class="ml-1.5 ease-in-out inline-flex items-center p-1.5 text-sm rounded-full bg-highlight-2 text-white hover:text-gray-200 hover:bg-highlight-dark transition duration-300 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21" />
                </svg>
            </button>
            <div v-if="openAdd" class="z-20 w-48" style="
                    position: fixed;
                    inset: 0px 0px auto auto;
                    margin: 0px;
                    transform: translate3d(-16px, 57.6px, 0px);
                    " data-popper-placement="bottom-end">
                <div>
                    <div id="headlessui-menu-items" role="menu" tabindex="0"
                        class="relative focus:outline-none overflow-y-auto scroll-py-1 divide-y divide-gray-200 dark:divide-gray-700 ring-1 ring-gray-200 dark:ring-gray-700 rounded-md shadow-lg bg-white dark:bg-gray-800">
                        <div class="p-1" role="none">
                            <a href="#"
                                class="group flex items-center gap-1.5 w-full px-1.5 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                                role="menuitem">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-600 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                                        <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                                        <path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19" />
                                    </g>
                                </svg>
                                <span class="truncate">New product </span>
                            </a>

                            <a href="#"
                                class="group flex items-center gap-1.5 w-full px-1.5 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                                role="menuitem">
                                <span class="flex-shrink-0 w-5 h-5 text-gray-600 dark:text-white" aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                                            <circle cx="12" cy="6" r="4" />
                                            <path stroke-linecap="round"
                                                d="M20.414 18.5H19m0 0h-1.414m1.414 0v-1.414m0 1.414v1.414M12 13c2.608 0 4.883.815 6.088 2.024m-2.504 5.413C14.536 20.794 13.31 21 12 21c-3.866 0-7-1.79-7-4c0-1.36 1.187-2.56 3-3.283" />
                                        </g>
                                    </svg>
                                </span>
                                <span class="truncate">New user</span>
                            </a>

                            <a href="#"
                                class="group flex items-center gap-1.5 w-full px-1.5 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                                role="menuitem">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-600 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2"
                                        d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3h6m-3-3v6" />
                                </svg>
                                <span class="truncate">New category</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const NavStore = useNavStore()
const openAdd = ref(false)
const notificationStore = useNotificationStore()

const target = useTemplateRef<HTMLElement>("NotificationBtn");

onClickOutside(
    target,
    (event) => (openAdd.value = false)
);
</script>