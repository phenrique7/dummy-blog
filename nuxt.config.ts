// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

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
    "./modules/app-bootstrap.ts",
  ],
});
