import { BaseRepository } from "~/lib/common/repository/base-repository";
import type {
  GuestbookPostDDB,
  GuestbookPostDTO,
  GuestbookPostAliasDDB,
} from "~/services/guestbook-posts/dto/dto";

export class GuestbookPostsRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Get all guestbook messages
   * @returns All guestbook messages
   */
  public async getAll(): Promise<GuestbookPostAliasDDB[] | null> {
    const stmt = this.db.prepare(
      `
          SELECT GP.id AS guestbook_post_id, GP.message AS guestbook_post_message, GP.created_at AS guestbook_post_created_at, G.name AS guest_name
          FROM guestbook_posts AS GP
                 INNER JOIN guests AS G ON GP.guest_id = G.id`,
    );

    const { results } = await stmt.all<GuestbookPostAliasDDB>();

    return results;
  }

  /**
   * Create a guestbook post in the database
   * @param guestbookPost Guestbook post data
   * @returns The guestbook post data created
   */
  public async create(
    guestbookPost: GuestbookPostDTO,
  ): Promise<GuestbookPostDDB> {
    const stmt = this.db
      .prepare(
        "INSERT INTO guestbook_posts (guest_id, message, created_at) VALUES (?1, ?2, ?3) RETURNING id, guest_id, message, created_at",
      )
      .bind(
        guestbookPost.guestId,
        guestbookPost.message,
        Math.floor(Date.now() / 1000),
      );

    const { results } = await stmt.run<GuestbookPostDDB>();

    return results[0];
  }
}
