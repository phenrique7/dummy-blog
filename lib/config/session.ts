import type { SessionConfig } from "h3";
import { AUTH_SESSION_NAME } from "~/constants/app";
import { SESSION_COOKIE_PASSWORD } from "~/constants/envs";

export type SessionData = {
  guestId: number;
  sessionId: number;
};

export const sessionConfig: SessionConfig = {
  name: AUTH_SESSION_NAME,
  password: SESSION_COOKIE_PASSWORD,
};
