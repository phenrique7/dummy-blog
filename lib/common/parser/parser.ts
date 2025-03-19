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
   * @param body Body to be parsed
   * @returns Parsed entity, throws BadRequestException otherwise.
   */
  public parseBody(body: any): T {
    const response = this.schema.safeParse(body);

    if (!response.success) {
      const { errors } = response.error;
      throw new BadRequestException(errors);
    }

    return response.data;
  }
}
