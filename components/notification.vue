<template>
  <!-- Overlay with transition -->
  <transition enter-active-class="transition-opacity ease-out duration-200" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-opacity ease-in duration-150"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="notificationStore.NotificationIsOpen" class="fixed inset-0 bg-black/50 z-40"
      @click.self="notificationStore.NotificationIsOpen = false">
      <!-- Notifications panel with slide transition -->
      <transition enter-active-class="transform transition ease-out duration-200" enter-from-class="translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transform transition ease-in duration-150"
        leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <div v-if="notificationStore.NotificationIsOpen" ref="notifications"
          class="fixed bg-white shadow-xl flex flex-col right-0 inset-y-0 w-full max-w-md overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
            <button type="button"
              class="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="notificationStore.NotificationIsOpen = false" aria-label="Close notifications">
              <span class="iconify i-lucide:x size-5"></span>
            </button>
          </div>

          <!-- Notifications List -->
          <div class="flex-1 overflow-y-auto divide-y divide-gray-100">
            <!-- Notification 1 -->
            <a href="/inbox?id=1"
              class="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-100">
              <div class="relative flex-shrink-0">
                <img src="https://i.pravatar.cc/128?u=2" alt="Jordan Brown" class="h-10 w-10 rounded-full object-cover"
                  width="40" height="40" />
                <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline gap-2">
                  <span class="font-medium text-gray-900 truncate">Jordan Brown</span>
                  <time datetime="1969-12-31T23:53:00.000Z" class="text-xs text-gray-500 whitespace-nowrap">55 years
                    ago</time>
                </div>
                <p class="text-sm text-gray-500 truncate mt-1">sent you a message</p>
              </div>
            </a>

            <!-- Notification 2 -->
            <a href="/inbox?id=2"
              class="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-100">
              <div class="relative flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span class="text-sm font-medium text-gray-600">LW</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline gap-2">
                  <span class="font-medium text-gray-900 truncate">Lindsay Walton</span>
                  <time datetime="1969-12-31T23:00:00.000Z" class="text-xs text-gray-500 whitespace-nowrap">55 years
                    ago</time>
                </div>
                <p class="text-sm text-gray-500 truncate mt-1">subscribed to your email list</p>
              </div>
            </a>

            <!-- Empty state (example) -->
            <!-- <div class="p-8 text-center text-gray-500">
              <span class="iconify i-lucide:bell-off inline-block size-6 mb-2"></span>
              <p>No new notifications</p>
            </div> -->
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-gray-200 bg-gray-50">
            <a href="/notifications"
              class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1">
              View all notifications
              <span class="iconify i-lucide:chevron-right size-4"></span>
            </a>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const notificationStore = useNotificationStore();
const notifications = ref<HTMLElement | null>(null);

onClickOutside(notifications, () => {
  notificationStore.NotificationIsOpen = false;
});
</script>