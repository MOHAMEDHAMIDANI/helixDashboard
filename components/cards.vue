<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0">
        <div
            class="relative flex rounded-xl bg-white/50 ring-1 ring-gray-200 transition-all hover:bg-white hover:ring-blue-300 hover:shadow-md lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl hover:z-10">
            <div class="relative flex flex-col flex-1 p-4 sm:p-6 gap-3">
                <div>
                    <div
                        class="inline-flex items-center justify-center mb-3 p-1.5 rounded-full bg-blue-50 ring-1 ring-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 14 14">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M12.918 1.623a1.623 1.623 0 1 1-3.246 0a1.623 1.623 0 0 1 3.246 0m1.024 5.037a.75.75 0 0 1-.732.586H7.098a.75.75 0 1 1 0-1.5h1.596A2.706 2.706 0 0 1 14 6.493a.27.27 0 0 1-.058.167M1.359 3.324a1.811 1.811 0 1 0 3.622 0a1.811 1.811 0 0 0-3.622 0M0 9.019a3.17 3.17 0 1 1 6.34 0v.858a.5.5 0 0 1-.5.5h-.86l-.398 3.185a.5.5 0 0 1-.496.438H2.253a.5.5 0 0 1-.496-.438l-.399-3.185H.5a.5.5 0 0 1-.5-.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-2xl font-semibold text-gray-900">905</span>
                    <span
                        class="font-medium inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 ring-1 ring-green-100 text-xs">
                        +7%
                    </span>
                </div>
            </div>
            <a href="/customers" tabindex="-1" aria-label="Customers" class="absolute inset-0 focus:outline-none"></a>
        </div>
        <div
            class="relative flex rounded-xl bg-white/50 ring-1 ring-gray-200 transition-all hover:bg-white hover:ring-blue-300 hover:shadow-md lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl hover:z-10">
            <div class="relative flex flex-col flex-1 p-4 sm:p-6 gap-3">
                <div>
                    <div
                        class="inline-flex items-center justify-center mb-3 p-1.5 rounded-full bg-blue-50 ring-1 ring-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 14 14">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="7" cy="7" r="6.5" />
                                <path d="M7 .5V7l4.6 4.6" />
                            </g>
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-2xl font-semibold text-gray-900">1,312</span>
                    <span
                        class="font-medium inline-flex items-center px-2 py-1 rounded-full bg-red-50 text-red-600 ring-1 ring-red-100 text-xs">
                        -8%
                    </span>
                </div>
            </div>
            <a href="/conversions" tabindex="-1" aria-label="Conversions"
                class="absolute inset-0 focus:outline-none"></a>
        </div>
        <div
            class="relative flex rounded-xl bg-white/50 ring-1 ring-gray-200 transition-all hover:bg-white hover:ring-blue-300 hover:shadow-md lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl hover:z-10">
            <div class="relative flex flex-col flex-1 p-4 sm:p-6 gap-3">
                <div>
                    <div
                        class="inline-flex items-center justify-center mb-3 p-1.5 rounded-full bg-blue-50 ring-1 ring-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372m47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2c.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8c-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119c0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3c-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7c4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124c-.1-69.4-44.2-100.4-109-116.4m-68.6-16.2c-5.6-1.6-10.3-3.1-15-5c-33.8-12.2-49.5-31.9-49.5-57.3c0-36.3 27.5-57 64.5-61.7zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2c47.3 14.4 63.2 34.4 63.2 65.1c0 39.1-29.4 62.6-72 66.4" />
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-2xl font-semibold text-gray-900">$353,999</span>
                    <span
                        class="font-medium inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 ring-1 ring-green-100 text-xs">
                        +12%
                    </span>
                </div>
            </div>
            <a href="/revenue" tabindex="-1" aria-label="Revenue" class="absolute inset-0 focus:outline-none"></a>
        </div>
        <div
            class="relative flex rounded-xl bg-white/50 ring-1 ring-gray-200 transition-all hover:bg-white hover:ring-blue-300 hover:shadow-md lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl hover:z-10">
            <div class="relative flex flex-col flex-1 p-4 sm:p-6 gap-3">
                <div>
                    <div
                        class="inline-flex items-center justify-center mb-3 p-1.5 rounded-full bg-blue-50 ring-1 ring-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M4 18V7.1L2.45 3.75q-.175-.375-.025-.763t.525-.562t.763-.037t.562.512L6.2 7.05h11.6l1.925-4.15q.175-.375.563-.525t.762.05q.375.175.525.563t-.025.762L20 7.1V18q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m6-5h4q.425 0 .713-.288T15 12t-.288-.712T14 11h-4q-.425 0-.712.288T9 12t.288.713T10 13" />
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-2xl font-semibold text-gray-900">273</span>
                    <span
                        class="font-medium inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 ring-1 ring-green-100 text-xs">
                        +10%
                    </span>
                </div>
            </div>
            <a href="/orders" tabindex="-1" aria-label="Orders" class="absolute inset-0 focus:outline-none"></a>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>