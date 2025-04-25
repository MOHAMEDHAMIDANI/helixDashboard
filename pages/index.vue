<template>
    <mainLayout>
        <cards />
        <div >
            <SalesDashboard  />
        </div>
    </mainLayout>
</template>

<script setup lang="ts">
import mainLayout from '~/layouts/mainLayout.vue';
const authStore = useAuthStore()
onMounted(() => {
    authStore.setTokens()
    console.log(authStore.access_token)
    console.log(authStore.access_token)

})
</script>

<style scoped></style>