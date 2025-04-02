export type BaseExceptionError = {
  status: "error";
  statusCode: number;
  statusMessage: string;
  error: {
    message: string;
    errors?: string;
  };
};

/**
 * Base exception class. It contains helper methods and/or should be inherited in other exceptions
 */
export class BaseException extends Error {
  /**
   * Create a new Base API Exception
   * @param statusCode HTTP status code that will be returned in API calls
   * @param statusMessage Status error message
   * @param errorMessage Error message
   */
  constructor(
    private statusCode: number,
    private statusMessage: string,
    private errorMessage: string,
  ) {
    super(statusMessage);
  }

  /**
   * Builds an BaseExceptionError
   * @returns An instance of BaseExceptionError containing information provided during instantiation
   */
  private apiResponse(): BaseExceptionError {
    return {
      status: "error",
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      error: {
        message: this.errorMessage,
        errors: this.stack,
      },
    };
  }

  /**
   * Builds an BaseExceptionError based on any exception type
   * @param exception Any exception
   * @returns An instance of BaseExceptionError containing whatever information could be retrieved from Error instance
   */
  public static getApiResponse(exception: any): BaseExceptionError {
    if (exception instanceof BaseException) {
      return exception.apiResponse();
    }

    return {
      status: "error",
      statusCode: 500,
      statusMessage: "Internal Server Error",
      error: {
        message: exception.errorMessage,
        errors: exception.stack,
      },
    };
  }
}
