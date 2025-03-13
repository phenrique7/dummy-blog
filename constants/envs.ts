export const PROD = import.meta.env.NODE_ENV === "production";

export const SESSION_COOKIE_PASSWORD = import.meta.env
  .NUXT_SESSION_COOKIE_PASSWORD;

export const APP_URL = import.meta.env.NUXT_APP_URL;

export const GITHUB_CLIENT_ID = import.meta.env.NUXT_GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = import.meta.env
  .NUXT_GITHUB_CLIENT_SECRET;

export const GOOGLE_CLIENT_ID = import.meta.env.NUXT_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = import.meta.env
  .NUXT_GOOGLE_CLIENT_SECRET;
