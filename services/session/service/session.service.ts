import type { EventHandlerRequest, H3Event } from "h3";
import { PROD } from "~/constants/envs";
import { Logger } from "~/lib/common/logger/logger";
import { AUTH_SESSION_NAME } from "~/constants/app";
import { sessionConfig, type SessionData } from "~/lib/config/session";
import { GuestRepository } from "~/services/session/repository/session.repository";

/**
 * Session service to handle guest oauth sessions
 * @param event H3 event
 */
export class SessionService {
  private readonly logger: Logger;
  private readonly sessionRepository: GuestRepository;

  constructor(private readonly event: H3Event<EventHandlerRequest>) {
    this.logger = new Logger("SessionService");
    this.sessionRepository = new GuestRepository();
  }

  /**
   * Create a session and register in the database
   * @param guestId Guest id
   * @returns SessionData with sessionId and guestId
   */
  public async createSession(guestId: number): Promise<SessionData> {
    this.logger
      .level("debug")
      .category("createSession::Start")
      .add("guestId", guestId)
      .flush();

    try {
      const maxAge = 60 * 60 * 24 * 30; // 30 days (in seconds)

      const session = await this.sessionRepository.create({
        guestId,
        expiresAt: new Date(Date.now() + 1000 * maxAge),
      });

      const cookieSession = await useSession<SessionData>(this.event, {
        ...sessionConfig,
        name: AUTH_SESSION_NAME,
        maxAge,
        cookie: {
          path: "/",
          secure: PROD,
          httpOnly: true,
          sameSite: "lax",
        },
      });

      const sessionData = {
        sessionId: session.id,
        guestId: session.guest_id,
      };

      await cookieSession.update(sessionData);

      this.logger
        .level("debug")
        .category("createSession::Result")
        .add("session", sessionData)
        .flush();

      return sessionData;
    } catch (error) {
      this.logger
        .level("error")
        .category("createSession::Error")
        .description("Error creating session register on database")
        .flush();

      throw new Error("Error creating session register on database", {
        cause: error,
      });
    }
  }

  /**
   * Validate if a session is valid and renew an existent session
   * if it is within 15 days of expiring.
   * @param sessionData Session data to validate
   * @returns True if session is valid, false otherwise
   */
  public async validateSession(
    sessionData: SessionData,
  ): Promise<boolean> {
    const session = await this.sessionRepository.get(
      sessionData.sessionId,
    );

    if (session === null) {
      this.logger
        .level("warn")
        .category("validateSession::Result")
        .description(`Session not found with id ${sessionData.sessionId}`)
        .flush();

      return false;
    }

    const sessionExpiresAt = new Date(session.expires_at * 1000);

    if (Date.now() >= sessionExpiresAt.getTime()) {
      await this.invalidateSession(sessionData.sessionId);

      this.logger
        .level("info")
        .category("validateSession::Result")
        .description(`Session expired with id ${sessionData.sessionId}`)
        .flush();

      return false;
    }

    if (
      Date.now() >=
      sessionExpiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
    ) {
      const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await this.sessionRepository.update(session.id, {
        expiresAt: Math.floor(newExpiresAt.getTime() / 1000),
      });
    }

    this.logger
      .level("debug")
      .category("validateSession::Result")
      .description(`Session valid with id ${sessionData.sessionId}`)
      .flush();

    return true;
  }

  /**
   * Invalidate a session
   * @param sessionId Session id to invalidate
   */
  public async invalidateSession(sessionId: number): Promise<void> {
    this.logger
      .level("debug")
      .category("invalidateSession::Start")
      .add("sessionId", sessionId)
      .description("Starting invalidate session...")
      .flush();

    await this.sessionRepository.delete(sessionId);
  }
}
