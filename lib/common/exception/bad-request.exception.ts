import { BaseException } from "~/lib/common/exception/base.exception";

/**
 * Exception that models an HTTP 400 error - Bad request (entity json) provided
 */
export class BadRequestException extends BaseException {
  /**
   * Builds a new InvalidBodyException
   * @param errors - Zod validation errors
   */
  constructor(errors: string) {
    super(400, "Invalid request", errors);
  }
}
