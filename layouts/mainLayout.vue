<template>
    <div class="fixed inset-0 flex overflow-hidden bg">
        <SideNav />
        <SideNavFull />
        <div class="flex flex-1 w-full min-w-0 ">
            <div class="flex-col  items-stretch relative w-full flex-1 flex">
                <NavBar />
                <div class="p-4  flex-1 flex flex-col overflow-y-auto">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue';
import SideNav from '~/components/SideNav.vue';
import SideNavFull from '~/components/SideNavFull.vue';
</script>

<style scoped></style>