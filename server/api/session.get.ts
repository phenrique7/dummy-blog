import { AUTH_SESSION_NAME } from "~/constants/app";
import { sessionConfig, type SessionData } from "~/lib/config/session";

export default defineEventHandler(async (event) => {
  const session = await useSession<SessionData>(event, {
    ...sessionConfig,
    name: AUTH_SESSION_NAME,
  });

  if (Object.keys(session.data).length === 0) {
    return { logged: false };
  }

  return { logged: true };
});
