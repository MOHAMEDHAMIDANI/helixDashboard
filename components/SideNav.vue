<template>
    <div
    :class="{ 'w-0': !NavStore.NavIsOpen, 'w-[13.5625rem]': NavStore.NavIsOpen }"
        class="duration-300 ease-in-out lg:flex hidden flex-col min-h-svh min-w-16 w-16 shrink-0 border-r border-(--ui-border) --ui-bg-elevated/25"
        style="--width: 0rem;">
        <div class="h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4">
            <button type="button" id="reka-dropdown-menu-trigger-v-0-0"
                aria-haspopup="menu" aria-expanded="false" data-state="closed"
                class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 w-full justify-center text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5 data-[state=open]:bg-(--ui-bg-elevated)"><span
                    class="inline-flex items-center justify-center select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated) size-5 text-[10px] shrink-0"
                    style=""><img role="img" src="https://github.com/nuxt.png" alt="Nuxt" width="20" height="20"
                        class="h-full w-full rounded-[inherit] object-cover"></span></button>
        </div>
        <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2"><button type="button"
                class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5 bg-transparent ring-(--ui-border)"
                aria-label="Search..."><span class="iconify i-lucide:search shrink-0 size-5"
                    aria-hidden="true"
                    style=""></span></button>
            <nav aria-label="Main" data-orientation="vertical" dir="ltr" data-reka-navigation-menu=""
                data-collapsed="true" class="relative flex gap-1.5 [&amp;>div]:min-w-0 flex-col">
                
                <div style="position:relative;">
                    <ul class="isolate min-w-0" data-orientation="vertical">
                        <li data-menu-item="" class="min-w-0"><a href="/"
                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-primary) before:bg-(--ui-bg-elevated) px-1.5"
                                data-active="" aria-current="page"
                                data-reka-collection-item=""><span
                                    class="iconify i-lucide:house shrink-0 size-5 text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
                                    aria-hidden="true"
                                    style=""></span></a>
                        </li>
                        <li data-menu-item="" class="min-w-0"><a href="/inbox"
                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors px-1.5"
                                data-reka-collection-item=""><span
                                    class="iconify i-lucide:inbox shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                    aria-hidden="true"
                                    style=""></span></a>
                        </li>
                        <li data-menu-item="" class="min-w-0"><a href="/customers"
                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors px-1.5"
                                data-reka-collection-item=""><span
                                    class="iconify i-lucide:users shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                    aria-hidden="true"
                                    style=""></span></a>
                        </li>
                        <li data-menu-item="" default-open="true" class="min-w-0"><a href="/settings"
                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors px-1.5"
                                data-reka-collection-item=""><span
                                    class="iconify i-lucide:settings shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                    aria-hidden="true"></span></a></li>
                    </ul>
                </div>
            </nav>
            <nav aria-label="Main" data-orientation="vertical" dir="ltr" data-reka-navigation-menu=""
                data-collapsed="true" class="relative flex gap-1.5 [&amp;>div]:min-w-0 flex-col mt-auto">
                
                <div style="position:relative;">
                    <ul class="isolate min-w-0" data-orientation="vertical">
                        <li data-menu-item="" class="min-w-0"><a
                                href="https://github.com/nuxt-ui-pro/dashboard" rel="noopener noreferrer"
                                target="_blank"
                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors px-1.5"
                                data-reka-collection-item=""><span
                                    class="iconify i-lucide:message-circle shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                    aria-hidden="true"
                                    style=""></span></a>
                        </li>
                        <li data-menu-item="" class="min-w-0"><a
                                href="https://github.com/nuxt/ui-pro" rel="noopener noreferrer" target="_blank"
                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors px-1.5"
                                data-reka-collection-item=""><span
                                    class="iconify i-lucide:info shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                    aria-hidden="true"
                                    style=""></span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="shrink-0 flex items-center gap-1.5 px-4 py-2 lg:border-t lg:border-(--ui-border)">
            <button type="button" name="Benjamin Canac"
                id="reka-dropdown-menu-trigger-v-0-4" aria-haspopup="menu" aria-expanded="false" data-state="closed"
                class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 w-full justify-center text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5 data-[state=open]:bg-(--ui-bg-elevated)"><span
                    class="inline-flex items-center justify-center select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated) size-5 text-[10px] shrink-0"
                    style=""><img role="img" src="https://github.com/benjamincanac.png" alt="Benjamin Canac" width="20"
                        height="20"
                        class="h-full w-full rounded-[inherit] object-cover"></span></button>
        </div>
    </div>
</template>

<script setup lang="ts">
const NavStore = useNavStore()

</script>

<style scoped></style>