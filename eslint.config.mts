import { createConfigForNuxt } from '@nuxt/eslint-config'

const config = createConfigForNuxt({
    features: {
        tooling: {
            regexp: false,
        }
    },
    files: ["/**/*.{vue,ts,js}"],
    ignores: ["**/*.config.{ts,js}", "!**/eslint.config.js", "**/*.d.ts"],
    rules: {
        'vue/multi-word-component-names': "off",
        '@typescript-eslint/no-explicit-any': "off",
    }
})
export default config
