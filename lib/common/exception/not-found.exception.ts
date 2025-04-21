import { BaseException } from "~/lib/common/exception/base.exception";

/**
 * Exception that models an HTTP 404 error - Not Found
 */
export class NotFoundException extends BaseException {
  /**
   * Builds a new NotFoundException
   * @param errorMessage Error message
   */
  constructor(errorMessage: string) {
    super(404, "Not found", errorMessage);
  }
}
