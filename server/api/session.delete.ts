import { SessionHandler } from "~/services/session/handler/session.handler";

export default defineEventHandler((event) =>
  new SessionHandler(event).deleteSession(),
);
