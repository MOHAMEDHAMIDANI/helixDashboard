<template>
  <div style="" class=" w-full h-full  bg-white">
    <MainLoader />
    <NuxtLayout>
      <nuxtPage />
    </NuxtLayout>
    <notification />
  </div>
</template>
<script lang="ts" setup>
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.user && !authStore.loading) {
    authStore.GetUserFromToken()
  }
})
</script>
