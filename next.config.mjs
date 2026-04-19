// next.config.mjs
const config = {
  output: 'standalone',
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  }
};

export default config;