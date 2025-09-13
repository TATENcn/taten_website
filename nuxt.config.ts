// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  builder: "vite",

  modules: ["@nuxt/eslint", "@nuxt/image"],

  srcDir: "app",
});
