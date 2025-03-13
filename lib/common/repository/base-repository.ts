import type { D1Database } from "@nuxthub/core";

/**
 * Base class for repositories.
 */
export abstract class BaseRepository {
  /** Db instance - used to calls to database operations */
  protected db: D1Database;

  /**
   * Base operations when creating a repository
   */
  protected constructor() {
    this.db = hubDatabase();
  }
}
