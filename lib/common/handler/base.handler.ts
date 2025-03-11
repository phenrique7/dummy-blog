import { z } from "zod";
import type { EventHandlerRequest, H3Event } from "h3";
import { Logger } from "~/lib/common/log/logger";
import { BaseException } from "~/lib/common/exception/base.exception";
import { sessionConfig, type SessionData } from "~/lib/config/session";
import { UnauthorizedException } from "~/lib/common/exception/unauthorized.exception";
import { Parser } from "~/lib/common/parser/parser";

/**
 * Base class for handlers
 */
export abstract class BaseHandler {
  private readonly baseLogger: Logger;

  protected constructor(protected event: H3Event<EventHandlerRequest>) {
    this.baseLogger = new Logger("BaseHandler");
  }

  /**
   * Validates user session
   * @param options If validate option is true, validates session, otherwise returns session without validation. Default: false
   * @returns session
   */
  protected async getSession(
    options = { validate: false },
  ): Promise<SessionData> {
    const session = await useSession<SessionData>(
      this.event,
      sessionConfig,
    );

    if (options.validate && !session.data) {
      throw new UnauthorizedException("Guest not logged in");
    }

    return session.data;
  }

  /**
   * Parses input data, calls handler function and finally builds response data
   * @param handler Handler function
   * @param options Options to be passed to handler function.
   * If the session option is set to true, the handler function will be called only if the guest is logged in.
   * @returns Handler function result
   */
  protected async handleRequest<T>(
    handler: (args: {
      body: unknown | null;
      query: any;
      session: SessionData;
    }) => Promise<T>,
    options = { session: false, schema: z.object({}) },
  ) {
    try {
      let body = null;
      const query = getQuery(this.event);

      if (this.event.method === "POST" || this.event.method === "PUT") {
        body = await readValidatedBody(this.event, (body) =>
          new Parser(options.schema).parseBody(body),
        );
      }

      const session = await this.getSession({ validate: options.session });
      const data = await handler({ body, query, session });

      return data ?? { message: "Ok" };
    } catch (exception) {
      const response = BaseException.getApiResponse(exception);

      if (exception instanceof Error && response.statusCode >= 500) {
        this.baseLogger
          .level("error")
          .category("BaseHandler::error")
          .description(exception.message)
          .add("statusCode", response.statusCode)
          .add("errorName", exception.name)
          .add("stack", exception.stack)
          .flush();
      }

      throw createError({
        statusCode: response.statusCode,
        statusMessage: response.error.message,
      });
    }
  }
}
