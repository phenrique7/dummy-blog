import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { google } from "~/lib/config/oauth";
import { Logger } from "~/lib/common/logger/logger";
import { GuestService } from "~/services/guest/service/guest.service";
import { GOOGLE_OAUTH_STATE, GOOGLE_CODE_VERIFIER } from "~/constants/app";
import { SessionService } from "~/services/session/service/session.service";

export default defineEventHandler(async function callback(event) {
  const logger = new Logger("GoogleCallbackHandler");
  const guestService = new GuestService();
  const sessionService = new SessionService(event);

  const code = (getQuery(event).code ?? null) as string | null;
  const state = (getQuery(event).state ?? null) as string | null;
  const storedState = getCookie(event, GOOGLE_OAUTH_STATE) ?? null;
  const storedCodeVerifier =
    getCookie(event, GOOGLE_CODE_VERIFIER) ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    storedCodeVerifier === null
  ) {
    logger
      .level("error")
      .category("callback::Error")
      .description(
        "Missing Google oauth state, code, stored state or stored code verifier",
      )
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
    tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
  } catch (e) {
    logger
      .level("error")
      .category("callback::Error")
      .description("Error validating Google authorization code")
      .add("error", e)
      .flush();

    return new Response("Please, restart the process.", {
      status: 400,
    });
  }

  const claims = decodeIdToken(tokens.idToken()) as {
    sub: string;
    name: string;
  };
  const googleGuestId = claims.sub;
  const googleGuestName = claims.name;

  let guest = await guestService.getByProviderId(googleGuestId);

  const goTo = state.split("?redirectUrl=")[1];

  if (guest !== null) {
    await sessionService.createSession(guest.id);
    return sendRedirect(event, goTo);
  }

  guest = await guestService.createGuest({
    provider: "google",
    name: googleGuestName,
    providerId: googleGuestId,
  });

  await sessionService.createSession(guest.id);

  return sendRedirect(event, goTo);
});
