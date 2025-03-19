import { generateState } from "arctic";
import { PROD } from "~/constants/envs";
import { github } from "~/lib/config/oauth";
import { GITHUB_OAUTH_STATE } from "~/constants/app";

export default defineEventHandler(function getAuthorizationURL(event) {
  const query = getQuery<{ redirectUrl: string }>(event);
  const state = generateState() + `?redirectUrl=${query.redirectUrl}`;
  const url = github.createAuthorizationURL(state, ["user:read"]);

  setCookie(event, GITHUB_OAUTH_STATE, state, {
    path: "/",
    secure: PROD,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes (in seconds)
  });

  return sendRedirect(event, url.toString());
});
