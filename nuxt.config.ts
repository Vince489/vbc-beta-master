// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon'
  ], 
  app: {
    head: {
      title: 'VBC',
      meta: [
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#374151' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Main hub of the VBC platform.' },
      ],
    },
  },
})