export const useNotificationStore = defineStore('Notification', {
    state: () => ({
        NotificationIsOpen : false,
    }),
    getters: {
        
    },
    actions: {
        toggleNotification() {
            this.NotificationIsOpen = !this.NotificationIsOpen
        },
    },
})