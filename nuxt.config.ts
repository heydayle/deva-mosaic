// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss',
    'nuxt-gtag'
  ],
  routeRules: {
    '/': { prerender: true, cache: { maxAge: 60 * 60 * 60 } }
  },
  colorMode: {
    preference: 'dark',
  },
  css: ['@/assets/styles.css'],
  runtimeConfig: {
    public: {
        NOTION_SECRET_KEY: process.env.NOTION_SECRET_KEY,
        NOTION_IMAGE_DB: process.env.NOTION_IMAGE_DB,
    }
  },
  gtag: {
    enabled: process.env.NODE_ENV !== 'dev',
    id: process.env.GG_GTAG_KEY || 'G-xxxxxxxx',
  },
  image: {
    providers: {
      notion: {
        name: 'notion',
        provider: '~/providers/notion.ts',
        options: {
          baseURL: 'https://www.notion.so',
        }
      }
    },
    domains: ['www.notion.so', 'notion.so']
  },
  vite: {
    server: {
      allowedHosts: ['localhost', '.dev'],
    },
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
        '@typescript-eslint/no-explicit-any': [0],
      }
    }
  },
  build: {
    transpile: ['gsap'],
  },
})

