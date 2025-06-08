// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vueuse/nuxt',
  ],

  build: {
    transpile: ['socket.io-client'],
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000',
    },
  },

  compatibilityDate: '2025-06-08',

  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  plugins: [
    '~/plugins/pinia-persist.client.ts'
  ]
})