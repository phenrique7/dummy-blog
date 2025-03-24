import { runtimeConfig } from "~/lib/config/runtime";

export const PROD = process.env.NODE_ENV === "production";

export const SESSION_COOKIE_PASSWORD = runtimeConfig.sessionCookiePassword;

export const APP_URL = runtimeConfig.public.appUrl;

export const GITHUB_CLIENT_ID = runtimeConfig.github.clientId;
export const GITHUB_CLIENT_SECRET = runtimeConfig.github.clientSecret;

export const GOOGLE_CLIENT_ID = runtimeConfig.google.clientId;
export const GOOGLE_CLIENT_SECRET = runtimeConfig.google.clientSecret;
