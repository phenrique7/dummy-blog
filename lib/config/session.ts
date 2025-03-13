import type { SessionConfig } from "h3";
import { SESSION_COOKIE_PASSWORD } from "~/constants/envs";

export type SessionData = {
  guestId: number;
  sessionId: number;
};

export const sessionConfig: SessionConfig = {
  password: SESSION_COOKIE_PASSWORD,
};
