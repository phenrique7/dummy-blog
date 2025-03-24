// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_APP_URL,
    },
    sessionCookiePassword: process.env.NUXT_SESSION_COOKIE_PASSWORD,
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    },
  },

  hub: {
    database: true,
  },

  alias: {
    "styled-system": resolve("./styled-system"),
  },

  css: ["@/ui/styles/base.css"],

  postcss: {
    plugins: {
      "@pandacss/dev/postcss": {},
    },
  },

  modules: [
    "@nuxtjs/storybook",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxthub/core",
  ],
});
