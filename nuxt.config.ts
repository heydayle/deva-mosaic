// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'nuxt-vue3-google-signin',
    '@sidebase/nuxt-auth',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/mdc',
  ],
  colorMode: {
    preference: 'dark',
  },
  image: {
    domains: ['nuxt-boilerplate-starter.vercel.app'],
    provider: 'ipx',
    dir: 'public/images',
  },
  css: ['@/assets/styles.css'],
  googleSignIn: {
    clientId: process.env.GG_CLIENT_ID,
  },
  runtimeConfig: {
    public: {
        GOOGLE_API_KEY: process.env.GG_API_KEY,
        SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
        telegramBotToken: process.env.TELEGRAM_BOT_TOKEN
    }
  },
  // nitro: {
  //   publicAssets: [{
  //     baseURL: "assets/images",
  //     dir: "public/images",
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //   },],
  // },
  vite: {
    server: {
      allowedHosts: ['localhost', '.dev'],
    },
  },
  auth: {
    isEnabled: true,
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix',
    locales: [
        {
          code: 'en',
          name: 'English',
          flag: 'twemoji:flag-united-kingdom',
          file: './locales/en.ts',
        },
        {
          code: 'vi',
          name: 'Tiếng Việt',
          flag: 'twemoji:flag-vietnam',
          file: './locales/vi.ts',
        },
    ],
  },
  fonts: {
    families: [
      { name: 'Be Vietnam Pro', provider: 'google' },
    ],
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
      subsets: [
        'cyrillic-ext',
        'cyrillic',
        'greek-ext',
        'greek',
        'vietnamese',
        'latin-ext',
        'latin',
      ]
    },
  },
  eslint: {
    overrideConfig: {
      rules: {
        'vue/multi-word-component-names':[0],
      }
    }
  },
})