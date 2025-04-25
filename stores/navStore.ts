export const useNavStore = defineStore('Nav', {
    state: () => ({
        NavIsOpen : false,
    }),
    getters: {
        
    },
    actions: {
        toggleNav() {
            this.NavIsOpen = !this.NavIsOpen
        },
    },
})