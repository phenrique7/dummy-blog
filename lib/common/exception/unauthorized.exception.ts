import { BaseException } from "~/lib/common/exception/base.exception";

/**
 * Exception that models an HTTP 401 error - unauthorized
 */
export class UnauthorizedException extends BaseException {
  /**
   * Builds a new UnauthorizedException
   * @param error - Unauthorized error
   */
  constructor(error: unknown) {
    super(401, "Unauthorized", error);
  }
}
