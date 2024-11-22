// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  pages: true,

  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],

  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
      apiUrl: process.env.API_URL || 'http://localhost:3000'
    },
  },

  app: {
    head: {
      script: [{ src: "https://js.stripe.com/v3/", defer: true }],
    },
  },

  router: {
    //middleware: ["auth"],
  },

  compatibilityDate: "2024-11-18",
});
