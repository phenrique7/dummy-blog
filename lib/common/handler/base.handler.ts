import { z, type ZodSchema } from "zod";
import type { EventHandlerRequest, H3Event } from "h3";
import { Logger } from "~/lib/common/logger/logger";
import { Parser } from "~/lib/common/parser/parser";
import { BaseException } from "~/lib/common/exception/base.exception";
import { sessionConfig, type SessionData } from "~/lib/config/session";
import { SessionService } from "~/services/session/service/session.service";
import { UnauthorizedException } from "~/lib/common/exception/unauthorized.exception";

/**
 * Base class for handlers
 */
export abstract class BaseHandler {
  private readonly baseLogger: Logger;

  protected constructor(protected event: H3Event<EventHandlerRequest>) {
    this.baseLogger = new Logger("BaseHandler");
  }

  /**
   * Validates user session and returns session data
   * @param options If validate option is true, validates session, otherwise returns session without validation. Default: false
   * @returns session Session data
   */
  private async getSession(
    options = { validate: false },
  ): Promise<SessionData> {
    const session = await useSession<SessionData>(
      this.event,
      sessionConfig,
    );

    if (options.validate) {
      if (Object.values(session.data).length === 0) {
        throw new UnauthorizedException("Guest not logged in");
      }

      const isValid = await new SessionService(this.event).validateSession(
        session.data,
      );

      if (!isValid) {
        throw new UnauthorizedException("Invalid or expired session");
      }
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
      body: any;
      query: any;
      session: SessionData;
    }) => Promise<T>,
    options: Partial<{ validateSession: boolean; schema: ZodSchema }> = {},
  ) {
    const { validateSession = false, schema = z.object({}) } = options;

    try {
      let body = null;
      const query = getQuery(this.event);

      if (this.event.method === "POST" || this.event.method === "PUT") {
        body = await readValidatedBody(this.event, (body) =>
          new Parser(schema).parseBody(body),
        );
      }

      const session = await this.getSession({ validate: validateSession });
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
          .add("statusMessage", response.statusMessage)
          .add("stack", exception.stack)
          .flush();
      }

      throw createError({
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        message: response.error.message,
        stack: response.error.errors,
      });
    }
  }
}
