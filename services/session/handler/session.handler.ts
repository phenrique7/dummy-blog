import type { EventHandlerRequest, H3Event } from "h3";
import { BaseHandler } from "~/lib/common/handler/base.handler";
import { SessionService } from "~/services/session/service/session.service";

/**
 * Session main handler. This class exports all session related operations.
 */
export class SessionHandler extends BaseHandler {
  /**
   * Builds a new SessionHandler instance
   * @param event H3 event
   */
  constructor(event: H3Event<EventHandlerRequest>) {
    super(event);
  }

  /**
   * Checks if a session exists
   * @returns Session data
   */
  public hasSession() {
    return this.handleRequest(async ({ session }) => {
      if (Object.keys(session).length === 0) {
        return { logged: false };
      }
      return { logged: true };
    });
  }

  /**
   * Deletes a session
   * @returns Session data
   */
  public deleteSession() {
    return this.handleRequest(async ({ session }) => {
      await new SessionService(this.event).invalidateSession(
        session.sessionId,
      );
    });
  }
}
