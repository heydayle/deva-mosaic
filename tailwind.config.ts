import { plugin } from "postcss";

export default {
    content: [
        './assets/**/*.{vue,js,css}',
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
      ],
    theme: {
        extend: {
            colors: {
                'white': {
                    '50': '#ffffff',
                    '100': '#efefef',
                    '200': '#dcdcdc',
                    '300': '#bdbdbd',
                    '400': '#989898',
                    '500': '#7c7c7c',
                    '600': '#656565',
                    '700': '#525252',
                    '800': '#464646',
                    '900': '#3d3d3d',
                    '950': '#292929',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ]
}