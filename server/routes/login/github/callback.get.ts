import type { OAuth2Tokens } from "arctic";
import { github } from "~/lib/config/oauth";
import { Logger } from "~/lib/common/logger/logger";
import { GITHUB_OAUTH_STATE } from "~/constants/app";
import type { GuestDTO } from "~/services/guest/dto/guest.dto";
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
      .category("callback::error")
      .description("Missing GitHub oauth state, code or stored state")
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  if (storedState !== state) {
    logger
      .level("error")
      .category("callback::error")
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
      .category("callback::validateAuthorizationCode")
      .description("Error validating GitHub authorization code")
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  let githubGuestId: number;
  let githubGuestName: string;

  try {
    const githubAccessToken = tokens.accessToken();

    const githubUserResult = (await $fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "phenrique7",
      },
    })) as GitHubUserResponse;

    githubGuestId = githubUserResult.id;
    githubGuestName = githubUserResult.name;

    logger
      .level("debug")
      .category("callback::fetch")
      .description("GitHub user info retrieved successfully")
      .add("githubUserResult", githubUserResult)
      .flush();
  } catch (e) {
    logger
      .level("error")
      .category("callback::fetch")
      .description("Error getting GitHub user info")
      .add("error", e)
      .add("error.data", (e as { data: unknown }).data)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  let guest: GuestDTO | null;

  try {
    guest = await guestService.getByProviderId(githubGuestId.toString());

    logger
      .level("debug")
      .category("callback::guestRetrieved")
      .description(`Guest retried: ${JSON.stringify(guest)}`)
      .flush();
  } catch (e) {
    logger
      .level("error")
      .category("callback::getByProviderId")
      .description(`Error getting guest by provider id ${githubGuestId}`)
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  const goTo = state.split("?redirectUrl=")[1];

  if (guest !== null) {
    try {
      await sessionService.createSession(guest.id);

      logger
        .level("debug")
        .category("callback::sessionCreated")
        .description(`Session created for guest: ${guest.id}`)
        .flush();
    } catch (e) {
      logger
        .level("error")
        .category("callback::createSession")
        .description("Error creating session for existing guest")
        .add("error", e)
        .flush();

      return new Response("Please, restart the process.", {
        status: 400,
      });
    }

    return sendRedirect(event, goTo);
  }

  try {
    guest = await guestService.createGuest({
      provider: "github",
      name: githubGuestName,
      providerId: githubGuestId.toString(),
    });

    logger
      .level("debug")
      .category("callback::guestCreated")
      .description(`Guest created successfully`)
      .add("guest", guest)
      .flush();
  } catch (e) {
    logger
      .level("error")
      .category("callback::createGuest")
      .description("Error creating guest")
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  try {
    await sessionService.createSession(guest.id);

    logger
      .level("debug")
      .category("callback::sessionCreated")
      .description(`Session created for guest: ${guest.id}`)
      .flush();
  } catch (e) {
    logger
      .level("error")
      .category("callback::createSession")
      .description("Error creating session for a new guest")
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  return sendRedirect(event, goTo);
});
