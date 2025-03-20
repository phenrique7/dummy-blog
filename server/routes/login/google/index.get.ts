import { generateCodeVerifier, generateState } from "arctic";
import { PROD } from "~/constants/envs";
import { google } from "~/lib/config/oauth";
import { GOOGLE_CODE_VERIFIER, GOOGLE_OAUTH_STATE } from "~/constants/app";

export default defineEventHandler(function getAuthorizationURL(event) {
  const query = getQuery<{ redirectUrl: string }>(event);
  const state = generateState() + `?redirectUrl=${query.redirectUrl}`;
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
  ]);

  setCookie(event, GOOGLE_OAUTH_STATE, state, {
    path: "/",
    secure: PROD,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes (in seconds)
  });

  setCookie(event, GOOGLE_CODE_VERIFIER, codeVerifier, {
    path: "/",
    secure: PROD,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes (in seconds)
  });

  return sendRedirect(event, url.toString());
});
