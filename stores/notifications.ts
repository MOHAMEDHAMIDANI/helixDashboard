import { defineStore } from 'pinia';

interface Notification {
    id: string;
    message: string;
    from: string;
    timestamp: string;
    isRead: boolean;
}

interface NotificationState {
    notifications: Notification[];
    NotificationIsOpen: boolean;
    isConnected: boolean;
    unreadCount: number;
}

export const useNotificationStore = defineStore('notifications', {
    state: (): NotificationState => ({
        notifications: [],
        NotificationIsOpen: false,
        isConnected: false,
        unreadCount: 0
    }),
    getters: {
        getUnreadCount: (state: NotificationState) => state.unreadCount
    },
    actions: {
        toggleNotification() {
            this.NotificationIsOpen = !this.NotificationIsOpen;
        },
        addNotification(notification: Notification) {
            this.notifications.unshift(notification);
            if (!notification.isRead) {
                this.unreadCount++;
            }
        },
        clearNotifications() {
            this.notifications = [];
            this.unreadCount = 0;
        },
        markAsRead(id: string) {
            const notification = this.notifications.find(n => n.id === id);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                this.unreadCount = Math.max(0, this.unreadCount - 1);
            }
        },
        markAllAsRead() {
            this.notifications.forEach(notification => {
                notification.isRead = true;
            });
            this.unreadCount = 0;
        },
        setConnectionState(state: boolean) {
            this.isConnected = state;
        },
        loadStoredNotifications() {
            try {
                if (typeof window !== 'undefined') {
                    const stored = localStorage.getItem('notifications');
                    if (stored) {
                        const parsed = JSON.parse(stored);
                        this.notifications = parsed || [];
                        this.unreadCount = this.notifications.filter(n => !n.isRead).length;
                    }
                }
            } catch (error) {
                console.error('Error loading stored notifications:', error);
                this.notifications = [];
                this.unreadCount = 0;
            }
        }
    },
    persist: true
});