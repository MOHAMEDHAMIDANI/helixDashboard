<template>
    <div data-state="open" v-if="NavStore.NavIsOpen"
        class="fixed inset-0 bg-(--ui-bg-elevated)/75 data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in] lg:hidden"
        style="pointer-events: auto;" data-aria-hidden="true" aria-hidden="true">
        <div data-dismissable-layer="" id="" role="dialog" aria-describedby="reka-dialog-description-v-0-17"
            aria-labelledby="reka-dialog-title-v-0-16" data-state="open" data-side="left" tabindex="-1"
            class="fixed bg-(--ui-bg) divide-y divide-(--ui-border) sm:ring ring-(--ui-border) sm:shadow-lg flex flex-col focus:outline-none left-0 inset-y-0 w-full max-w-md data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out] lg:hidden"
            style="pointer-events: auto;"><!---->
            <div class="h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4 sm:px-6"><button type="button"
                    aria-label="Close sidebar"
                    class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5 lg:hidden"><span
                        class="iconify i-lucide:x shrink-0 size-5"
                        aria-hidden="true"></span><!----><!----></button><button type="button"
                    id="reka-dropdown-menu-trigger-v-0-18" aria-haspopup="menu" aria-expanded="false"
                    data-state="closed"
                    class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-2.5 text-sm gap-1.5 w-full justify-center text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent data-[state=open]:bg-(--ui-bg-elevated) py-2"><span
                        class="inline-flex items-center justify-center select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated) size-5 text-[10px] shrink-0"><img
                            role="img" src="https://github.com/nuxt.png" alt="Nuxt" width="20" height="20"
                            class="h-full w-full rounded-[inherit] object-cover"></span><span
                        class="truncate">Nuxt</span><span
                        class="iconify i-lucide:chevrons-up-down shrink-0 size-5 ms-auto text-(--ui-text-dimmed)"
                        aria-hidden="true"></span></button><!----><!----></div>
            <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2 sm:px-6"><button type="button"
                    class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-2.5 py-1.5 text-sm gap-1.5 ring ring-inset text-(--ui-text) hover:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg) aria-disabled:bg-(--ui-bg) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted) bg-transparent ring-(--ui-border)"><span
                        class="iconify i-lucide:search shrink-0 size-5" aria-hidden="true"></span><span
                        class="truncate">Search...</span>
                    <div class="hidden lg:flex items-center gap-0.5 ms-auto"><kbd
                            class="inline-flex items-center justify-center px-1 rounded-(--ui-radius) font-medium font-sans bg-(--ui-bg-elevated) text-(--ui-text) ring ring-inset ring-(--ui-border-accented) h-5 min-w-[20px] text-[11px]">⊞</kbd><kbd
                            class="inline-flex items-center justify-center px-1 rounded-(--ui-radius) font-medium font-sans bg-(--ui-bg-elevated) text-(--ui-text) ring ring-inset ring-(--ui-border-accented) h-5 min-w-[20px] text-[11px]">K</kbd>
                    </div>
                </button><!----><!---->
                <nav aria-label="Main" data-orientation="vertical" dir="ltr" data-reka-navigation-menu=""
                    class="relative flex gap-1.5 [&amp;>div]:min-w-0 flex-col">
                    <div style="position: relative;">
                        <ul class="isolate min-w-0" data-orientation="vertical">
                            <li data-menu-item="" class="min-w-0"><a href="/"
                                    class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-primary) before:bg-(--ui-bg-elevated)"
                                    data-active="" aria-current="page" data-reka-collection-item=""><span
                                        class="iconify i-lucide:house shrink-0 size-5 text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
                                        aria-hidden="true"></span><span
                                        class="truncate">Home<!----></span><!----></a><!----></li>
                            <li data-menu-item="" class="min-w-0"><a href="/inbox"
                                    class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                    data-reka-collection-item=""><span
                                        class="iconify i-lucide:inbox shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                        aria-hidden="true"></span><span class="truncate">Inbox<!----></span><span
                                        class="ms-auto inline-flex gap-1.5 items-center"><span
                                            class="font-medium inline-flex items-center text-[10px]/3 px-1.5 py-1 gap-1 rounded-[calc(var(--ui-radius))] ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg) shrink-0"><!----><span
                                                class="truncate">4</span><!----></span><!----></span></a><!----></li>
                            <li data-menu-item="" class="min-w-0"><a href="/customers"
                                    class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                    data-reka-collection-item=""><span
                                        class="iconify i-lucide:users shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                        aria-hidden="true"></span><span
                                        class="truncate">Customers<!----></span><!----></a><!----></li>
                            <li data-state="open" class="min-w-0" value="3"><button type="button" aria-controls=""
                                    aria-expanded="true" data-state="open"
                                    class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                    data-reka-collection-item=""><span
                                        class="iconify i-lucide:settings shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                        aria-hidden="true"></span><span class="truncate">Settings<!----></span><span
                                        class="ms-auto inline-flex gap-1.5 items-center"><!----><span
                                            class="iconify i-lucide:chevron-down size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200"
                                            aria-hidden="true"></span></span></button><!---->
                                <div class="data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
                                    id="reka-collapsible-content-v-0-20"
                                    style="--reka-collapsible-content-height: 127.95000457763672px; --reka-collapsible-content-width: 400px; transition-duration: 0s; animation-name: none;"
                                    data-state="open">
                                    <ul class="ms-5 border-s border-(--ui-border)">
                                        <li data-menu-item="" class="ps-1.5 -ms-px"><a href="/settings"
                                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                                data-reka-collection-item=""><!----><span
                                                    class="truncate">General<!----></span><!----></a><!----></li>
                                        <li data-menu-item="" class="ps-1.5 -ms-px"><a href="/settings/members"
                                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                                data-reka-collection-item=""><!----><span
                                                    class="truncate">Members<!----></span><!----></a><!----></li>
                                        <li data-menu-item="" class="ps-1.5 -ms-px"><a href="/settings/notifications"
                                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                                data-reka-collection-item=""><!----><span
                                                    class="truncate">Notifications<!----></span><!----></a><!----></li>
                                        <li data-menu-item="" class="ps-1.5 -ms-px"><a href="/settings/security"
                                                class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                                data-reka-collection-item=""><!----><span
                                                    class="truncate">Security<!----></span><!----></a><!----></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div><!----><!---->
                </nav><!----><!---->
                <nav aria-label="Main" data-orientation="vertical" dir="ltr" data-reka-navigation-menu=""
                    class="relative flex gap-1.5 [&amp;>div]:min-w-0 flex-col mt-auto">
                    <div style="position: relative;">
                        <ul class="isolate min-w-0" data-orientation="vertical">
                            <li data-menu-item="" class="min-w-0"><a href="https://github.com/nuxt-ui-pro/dashboard"
                                    rel="noopener noreferrer" target="_blank"
                                    class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                    data-reka-collection-item=""><span
                                        class="iconify i-lucide:message-circle shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                        aria-hidden="true"></span><span class="truncate">Feedback<span
                                            class="iconify i-lucide:arrow-up-right inline-block size-3 align-top text-(--ui-text-dimmed)"
                                            aria-hidden="true"></span></span><!----></a><!----></li>
                            <li data-menu-item="" class="min-w-0"><a href="https://github.com/nuxt/ui-pro"
                                    rel="noopener noreferrer" target="_blank"
                                    class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors"
                                    data-reka-collection-item=""><span
                                        class="iconify i-lucide:info shrink-0 size-5 text-(--ui-text-dimmed) group-hover:text-(--ui-text) transition-colors"
                                        aria-hidden="true"></span><span class="truncate">Help &amp; Support<span
                                            class="iconify i-lucide:arrow-up-right inline-block size-3 align-top text-(--ui-text-dimmed)"
                                            aria-hidden="true"></span></span><!----></a><!----></li>
                        </ul>
                    </div><!----><!---->
                </nav>
            </div>
            <div class="shrink-0 flex items-center gap-1.5 px-4 py-2 sm:px-6 lg:border-t lg:border-(--ui-border)">
                <button type="button" name="Benjamin Canac" id="reka-dropdown-menu-trigger-v-0-22" aria-haspopup="menu"
                    aria-expanded="false" data-state="closed"
                    class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-2.5 py-1.5 text-sm gap-1.5 w-full justify-center text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent data-[state=open]:bg-(--ui-bg-elevated)"><span
                        class="inline-flex items-center justify-center select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated) size-5 text-[10px] shrink-0"><img
                            role="img" src="https://github.com/benjamincanac.png" alt="Benjamin Canac" width="20"
                            height="20" class="h-full w-full rounded-[inherit] object-cover"></span><span
                        class="truncate">Benjamin Canac</span><span
                        class="iconify i-lucide:chevrons-up-down shrink-0 size-5 ms-auto text-(--ui-text-dimmed)"
                        aria-hidden="true"></span></button><!----></div>
        </div>

    </div>
</template>

<script setup lang="ts">
const NavStore = useNavStore()
</script>

<style scoped></style>