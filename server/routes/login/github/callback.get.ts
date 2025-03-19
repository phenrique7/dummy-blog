import type { OAuth2Tokens } from "arctic";
import { github } from "~/lib/config/oauth";
import { Logger } from "~/lib/common/logger/logger";
import { GITHUB_OAUTH_STATE } from "~/constants/app";
import { GuestService } from "~/services/guest/service/guest.service";
import { SessionService } from "~/services/session/service/session.service";

type GitHubUserResponse = {
  id: number;
  name: string;
};

export default defineEventHandler(async function callback(event) {
  const logger = new Logger("GitHubCallbackHandler");
  const guestService = new GuestService();
  const sessionService = new SessionService(event);

  const code = (getQuery(event).code ?? null) as string | null;
  const state = (getQuery(event).state ?? null) as string | null;
  const storedState = getCookie(event, GITHUB_OAUTH_STATE) ?? null;

  if (storedState === null || code === null || state === null) {
    logger
      .level("error")
      .category("callback::Error")
      .description("Missing GitHub oauth state, code or stored state")
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }
  if (storedState !== state) {
    logger
      .level("error")
      .category("callback::Error")
      .description("Stored state is different from the one received")
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await github.validateAuthorizationCode(code);
  } catch (e) {
    logger
      .level("error")
      .category("callback::Error")
      .description("Error validating GitHub authorization code")
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  let githubUserResult: GitHubUserResponse;

  try {
    const githubAccessToken = tokens.accessToken();

    const userRequest = new Request("https://api.github.com/user");
    userRequest.headers.set(
      "Authorization",
      `Bearer ${githubAccessToken}`,
    );
    const userResponse = await fetch(userRequest);
    githubUserResult = await userResponse.json();
  } catch (e) {
    logger
      .level("error")
      .category("callback::Error")
      .description("Error getting GitHub user info")
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  const githubGuestId = githubUserResult.id;
  const githubGuestName = githubUserResult.name;

  let guest = await guestService.getByProviderId(githubGuestId);

  const goTo = state.split("?redirectUrl=")[1];

  if (guest !== null) {
    await sessionService.createSession(guest.id);
    return sendRedirect(event, goTo);
  }

  guest = await guestService.createGuest({
    provider: "github",
    name: githubGuestName,
    providerId: githubGuestId.toString(),
  });

  await sessionService.createSession(guest.id);

  return sendRedirect(event, goTo);
});
