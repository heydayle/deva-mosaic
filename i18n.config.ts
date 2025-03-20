export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    strategy: 'prefix',
    locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'vi',
          name: 'Tiếng Việt'
        },
    ],
    messages: {
      en: {
        hello: 'Hello'
      },
      vi: {
        hello: 'Xin chào'
      }
    }
  }))
  