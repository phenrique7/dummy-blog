import { BaseException } from "~/lib/common/exception/base.exception";

/**
 * Exception that models an HTTP 400 error - Bad request (entity json) provided
 */
export class BadRequestException extends BaseException {
  /**
   * Builds a new BadRequestException
   * @param errorMessage - Error message to be displayed
   */
  constructor(errorMessage: string) {
    super(400, "Bad request", errorMessage);
  }
}
