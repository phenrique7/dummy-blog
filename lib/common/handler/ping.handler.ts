import type { EventHandlerRequest, H3Event } from "h3";
import { BaseHandler } from "~/lib/common/handler/base.handler";

/**
 * Ping handler.
 */
export class PingHandler extends BaseHandler {
  constructor(event: H3Event<EventHandlerRequest>) {
    super(event);
  }

  /**
   * Ping API.
   * @returns Ping response ("pong")
   */
  public ping() {
    return this.handleRequest(() => Promise.resolve({ ping: "pong" }));
  }
}
