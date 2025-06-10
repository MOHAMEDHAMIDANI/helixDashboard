<template>
    <mainLayout>
        <div class="container mx-auto px-4 py-8">
            <cards />
            <div class="mt-8">
                <SalesDashboard />
            </div>
        </div>
    </mainLayout>
</template>

<script setup>
import mainLayout from '~/layouts/mainLayout.vue'
import cards from '~/components/cards.vue'
import SalesDashboard from '~/components/SalesDashboard.vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
    authStore.setTokens()
})
</script>

<style scoped>
.container {
    max-width: 1280px;
}
</style>