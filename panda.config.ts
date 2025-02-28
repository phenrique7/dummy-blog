import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./app.vue",
    "./ui/**/*.{js,ts,vue}",
    "./pages/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
  ],

  // Files to exclude
  exclude: [],

  globalFontface: {
    Inter: [
      {
        src: 'url("/fonts/inter-v18-latin-regular.woff2") format("woff2");',
        fontWeight: 400,
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        src: 'url("/fonts/inter-v18-latin-500.woff2") format("woff2");',
        fontWeight: 500,
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        src: 'url("/fonts/inter-v18-latin-600.woff2") format("woff2");',
        fontWeight: 600,
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        src: 'url("/fonts/inter-v18-latin-700.woff2") format("woff2");',
        fontWeight: 700,
        fontStyle: "normal",
        fontDisplay: "swap",
      },
    ],
  },

  // Useful for theme customization
  theme: {
    semanticTokens: {
      colors: {
        borders: {
          value: { base: "#DEDEDE", _dark: "#38444D" },
        },
        text_main: {
          value: { base: "{colors.stone.800}", _dark: "#E2E8f0" },
        },
        text_muted: {
          value: { base: "{colors.zinc.500}", _dark: "#8899A6" },
        },
        post_color: {
          value: { base: "#111111", _dark: "#FFFFFF" },
        },
        highlight: {
          value: { base: "{colors.blue.500}", _dark: "{colors.blue.500}" },
        },
        medium_background: {
          value: { base: "#F0F0F3", _dark: "#1f3141" },
        },
        background: {
          value: { base: "#FFFFFF", _dark: "#16202C" },
        },
        db_white: {
          value: { base: "#FFFFFF", _dark: "#FFFFFF" },
        },
        db_black: {
          value: { base: "#000000", _dark: "#000000" },
        }
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
