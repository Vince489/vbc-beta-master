// nuxt.config.js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    'shadcn-nuxt',
    '@nuxt/image',
  ],
  image: {
    // Optional configuration options
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280
    },
    domains: ['https://vince489.github.io'] // Add the GitHub Pages domain here
  },
  plugins: [
    '~/plugins/socketio.js',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Virtron Boxing Club',
      meta: [
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#374151' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Main hub of the VBC gaming platform.' },
      ],
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
});
