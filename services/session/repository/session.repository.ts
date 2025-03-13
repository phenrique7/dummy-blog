import { BaseRepository } from "~/lib/common/repository/base-repository";
import type {
  SessionDDB,
  CreateSessionDTO,
  UpdateSessionDTO,
} from "~/services/session/dto/session.dto";

export class GuestRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Get a session from the database
   * @param sessionId The session id to get
   */
  public get(sessionId: number): Promise<SessionDDB | null> {
    const stmt = this.db
      .prepare("SELECT * FROM sessions WHERE id = ?1")
      .bind(sessionId);

    return stmt.first<SessionDDB>();
  }

  /**
   * Create a session in the database
   * @param session
   */
  public async create(session: CreateSessionDTO): Promise<SessionDDB> {
    const stmt = this.db
      .prepare(
        "INSERT INTO sessions (guest_id, expires_at, created_at) VALUES (?1, ?2, ?3)",
      )
      .bind(
        session.guestId,
        Math.floor(session.expiresAt.getTime() / 1000),
        Math.floor(Date.now() / 1000),
      );

    const { results } = await stmt.run<SessionDDB>();

    return results[0];
  }

  /**
   * Update a session in the database
   * @param sessionId The session id to update
   * @param updateSession The session data to update
   */
  public update(
    sessionId: number,
    updateSession: UpdateSessionDTO,
  ): Promise<SessionDDB | null> {
    const stmt = this.db
      .prepare("UPDATE sessions SET expires_at = ?2 WHERE id = ?1")
      .bind(sessionId, updateSession.expiresAt);

    return stmt.first<SessionDDB>();
  }

  /**
   * Delete a session in the database
   * @param sessionId The session id to delete
   */
  public async delete(sessionId: number): Promise<void> {
    const stmt = this.db
      .prepare("DELETE FROM sessions WHERE id = ?1")
      .bind(sessionId);

    await stmt.run();
  }
}
