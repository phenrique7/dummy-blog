export type LogLevelEnum = "debug" | "info" | "warn" | "error";

/**
 * Logger that makes it easier to structure JSON logs.
 *
 * To use it simply do this:
 * ```typescript
 * const logger = new Logger(MyClass.name);
 * ...
 * logger.level('error')
 *      .description('The result is not valid')
 *      .category('validationResult')
 *      .add('id', orderId)
 *      .add('input', orderCreateDto)
 *      .add('valid', validationResult)
 *      .add('error', validationResultErrors)
 *      .flush();
 * ```
 */
export class Logger {
  private _name: string;
  private _category?: string;
  private _level?: LogLevelEnum;
  private _description?: string;
  private _data: any = {};

  /**
   * Creates a new instance of the Logger.
   * @param name Class name or file name of the logged object. This is used to identify the block of the code this log belongs to.
   */
  constructor(name: string) {
    this._name = name;
  }

  /**
   * Category of the log, used to identify the block of the code this log belongs to.
   * This is useful to easily understand and find logs.
   * @param name
   * @returns the logger instance to enable method chaining.
   */
  public category(name: string): Logger {
    this._category = name;
    return this;
  }

  /**
   * The severity level of the logged message.
   * This value defined here will be used to wrap to the native JS console method name.
   * @param logLevel
   * @returns the logger instance to enable method chaining.
   */
  public level(logLevel: LogLevelEnum): Logger {
    this._level = logLevel;
    return this;
  }

  /**
   * Just a human-friendly message.
   * @param message
   * @returns the logger instance to enable method chaining.
   */
  public description(message: string): Logger {
    this._data.description = message;
    return this;
  }

  /**
   * Add new information to the current log.
   * @param key String identifier of the information.
   * @param value Object containing the log information.
   * @returns the logger instance to enable method chaining.
   */
  public add(key: string, value: any): Logger {
    this._data[key] = value;
    return this;
  }

  /**
   * Flushes the current log information to console.log and resets the information stored on this instance to allow new
   * logs start fresh.
   */
  public flush(): void {
    const structLog = JSON.stringify({
      name: this._name,
      level: this._level ?? null,
      category: this._category ?? null,
      description: this._description ?? null,
      data: {
        ...this._data,
      },
    });

    console.group(
      "・---------------------------------------------------- ★ ----------------------------------------------------・",
    );
    console[this._level ?? "log"](structLog);
    console.groupEnd();

    this._level = undefined;
    this._category = undefined;
    this._description = undefined;
    this._data = {};
  }
}
