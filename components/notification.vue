<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "~/stores/auth";
import { useNotificationStore } from "~/stores/notifications";
import { useRuntimeConfig } from "nuxt/app";
import { X, Check, CheckCheck, BellOff, Trash2 } from 'lucide-vue-next';

const notificationStore = useNotificationStore();
const notifications = ref<HTMLElement | null>(null);
const socket = ref<any>(null);
const reconnectAttempts = ref(0);
const maxReconnectAttempts = 5;
const reconnectDelay = 3000; // 3 seconds
const notificationSound = ref<HTMLAudioElement | null>(null);

const connectSocket = () => {
  const authStore = useAuthStore();
  if (!authStore.access_token) return;

  const config = useRuntimeConfig();
  const backendUrl = config.public.apiUrl;
  
  socket.value = io(backendUrl, {
    auth: {
      token: authStore.access_token
    },
    reconnection: true,
    reconnectionAttempts: maxReconnectAttempts,
    reconnectionDelay: reconnectDelay,
    timeout: 10000
  });

  socket.value.on('connect', () => {
    console.log('WebSocket connected');
    notificationStore.setConnectionState(true);
    reconnectAttempts.value = 0;
  });

  socket.value.on('disconnect', () => {
    console.log('WebSocket disconnected');
    notificationStore.setConnectionState(false);
  });

  socket.value.on('connect_error', (error: any) => {
    console.error('WebSocket connection error:', error);
    notificationStore.setConnectionState(false);
    reconnectAttempts.value++;
    
    if (reconnectAttempts.value >= maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      socket.value.disconnect();
    }
  });

  socket.value.on('notification', (notification: any) => {
    notificationStore.addNotification(notification);
    // Play notification sound
    if (notificationSound.value) {
      notificationSound.value.currentTime = 0;
      notificationSound.value.play().catch(err => console.error('Error playing notification sound:', err));
    }
  });
};

onMounted(() => {
  notificationStore.loadStoredNotifications();
  connectSocket();
  // Initialize notification sound
  notificationSound.value = new Audio('/notification.mp3');
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
  if (notificationSound.value) {
    notificationSound.value.pause();
    notificationSound.value = null;
  }
});

onClickOutside(notifications, () => {
  notificationStore.NotificationIsOpen = false;
});

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now';
  }
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  }
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  }
  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days}d ago`;
  }
  // Otherwise show the date
  return date.toLocaleDateString();
};
</script>

<template>
  <div class="relative">
    <transition
      enter-active-class="transition-opacity ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="notificationStore.NotificationIsOpen"
        class="fixed inset-0 bg-black/50 z-40"
        @click.self="notificationStore.NotificationIsOpen = false"
      >
        <transition
          enter-active-class="transform transition ease-out duration-200"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in duration-150"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-if="notificationStore.NotificationIsOpen"
            ref="notifications"
            class="fixed bg-white shadow-xl flex flex-col right-0 inset-y-0 w-full max-w-md overflow-hidden"
          >
            <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-semibold text-gray-900">Notifications</h2>
                <span
                  v-if="!notificationStore.isConnected"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full"
                >
                  Offline
                </span>
                <span
                  v-if="notificationStore.unreadCount > 0"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                >
                  {{ notificationStore.unreadCount }} unread
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-if="notificationStore.notifications.length > 0"
                  @click="notificationStore.markAllAsRead"
                  class="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Mark all as read"
                >
                  <CheckCheck class="w-5 h-5 text-gray-600" />
                </button>
                <button
                  type="button"
                  class="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                  @click="notificationStore.NotificationIsOpen = false"
                  aria-label="Close notifications"
                >
                  <X class="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto divide-y divide-gray-100">
              <div
                v-for="notification in notificationStore.notifications"
                :key="notification.id"
                class="group flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-100"
                :class="{ 'bg-blue-50': !notification.isRead }"
                @click="notificationStore.markAsRead(notification.id)"
              >
                <div class="relative flex-shrink-0">
                  <div
                    class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm"
                  >
                    <span class="text-sm font-medium text-white">{{
                      notification.from.charAt(0)
                    }}</span>
                  </div>
                  <div
                    v-if="!notification.isRead"
                    class="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-baseline gap-2">
                    <span class="font-medium text-gray-900 truncate">{{
                      notification.from
                    }}</span>
                    <time
                      :datetime="notification.timestamp"
                      class="text-xs text-gray-500 whitespace-nowrap"
                    >
                      {{ formatTimestamp(notification.timestamp) }}
                    </time>
                  </div>
                  <p class="text-sm text-gray-600 mt-1 leading-relaxed">
                    {{ notification.message }}
                  </p>
                </div>
                <button
                  class="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @click.stop="notificationStore.markAsRead(notification.id)"
                  aria-label="Mark as read"
                >
                  <Check class="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div
                v-if="notificationStore.notifications.length === 0"
                class="flex flex-col items-center justify-center p-8 text-center"
              >
                <BellOff class="w-12 h-12 text-gray-400 mb-2" />
                <p class="text-gray-500">No notifications yet</p>
              </div>
            </div>

            <div class="p-3 border-t border-gray-200 bg-gray-50">
              <button
                v-if="notificationStore.notifications.length > 0"
                @click="notificationStore.clearNotifications"
                class="text-sm font-medium text-red-600 hover:text-red-700 transition-colors flex items-center justify-center gap-2 w-full py-2 px-3 rounded-md hover:bg-red-50"
              >
                Clear all notifications
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}
</style>