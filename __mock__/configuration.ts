//@ts-nocheck
export const configuration = `
```.ts
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        '@nuxtjs/i18n',
        '@nuxt/fonts',
        '@nuxtjs/eslint-module',
        '@nuxtjs/mdc',
        'nuxt-vue3-google-signin',
        '@sidebase/nuxt-auth',
        '@vueuse/nuxt',
        '@pinia/nuxt',
    ],
    colorMode: {
        preference: 'dark',
    },
    image: {
        domains: ['YOUR_DOMAIN'],
        provider: 'ipx',
        dir: 'public/images',
    },
    css: ['@/assets/styles.css'],
    googleSignIn: {
        clientId: YOUR_GOOGLE_CLIENT_ID,
    },
    runtimeConfig: {
        public: {
            // YOUR_KEY
        }
    },
    nitro: {
        // https://nitro.build/config
    },
    vite: {
        server: {
            allowedHosts: ['localhost', '.dev'],
        },
    },
    auth: {
        // https://auth.sidebase.io/guide/application-side/configuration
    },
    i18n: {
        // https://i18n.nuxtjs.org/
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
                'vue/multi-word-component-names': [0],
            }
        }
    },
})
    ```
`