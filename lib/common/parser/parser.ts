import { ZodSchema } from "zod";
import { BadRequestException } from "~/lib/common/exception/bad-request.exception";

/**
 * JSON Schema parser main class
 */
export class Parser<T> {
  protected schema: ZodSchema;

  constructor(schema: ZodSchema) {
    this.schema = schema;
  }

  /**
   * Parse a JSON string, validating it against the provided schema
   * @returns Parsed entity, throws BadRequestException otherwise.
   *
   * @param body Body to be parsed
   */
  public parseBody(body: unknown): T {
    const response = this.schema.safeParse(body);

    if (!response.success) {
      throw new BadRequestException(
        "Invalid body object: " + JSON.stringify(response.error.format()),
      );
    }

    return response.data;
  }

  /**
   * Parse a query object, validating it against the provided schema
   * @returns Parsed entity, throws BadRequestException otherwise.
   *
   * @param query Query string (as an object) to be parsed
   */
  public parseQuery(query: unknown): T {
    const response = this.schema.safeParse(query);

    if (!response.success) {
      throw new BadRequestException(
        "Invalid query object: " + JSON.stringify(response.error.format()),
      );
    }

    return response.data;
  }
}
