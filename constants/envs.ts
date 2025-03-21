export const PROD = import.meta.env.NODE_ENV === "production";

export const SESSION_COOKIE_PASSWORD =
  process.env.NUXT_SESSION_COOKIE_PASSWORD;

export const APP_URL = process.env.NUXT_APP_URL;

export const GITHUB_CLIENT_ID = process.env.NUXT_GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.NUXT_GITHUB_CLIENT_SECRET;

export const GOOGLE_CLIENT_ID = process.env.NUXT_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.NUXT_GOOGLE_CLIENT_SECRET;
