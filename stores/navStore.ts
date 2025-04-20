export const useNavStore = defineStore('Nav', {
    state: () => ({
        NavIsOpen : true,
    }),
    getters: {
        
    },
    actions: {
        toggleNav() {
            this.NavIsOpen = !this.NavIsOpen
        },
    },
})