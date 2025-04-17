import { Logger } from "~/lib/common/logger/logger";
import { GuestbookPostsRepository } from "~/services/guestbook-posts/repository/guestbook-posts.repository";
import type {
  GuestbookPostResponse,
  CreateGuestbookPostsDTO,
  CreateGuestbookPostResponse,
} from "~/services/guestbook-posts/dto/dto";

export class GuestbookPostsService {
  private readonly logger: Logger;
  private readonly guestbookPostsRepository: GuestbookPostsRepository;

  constructor() {
    this.logger = new Logger("GuestbookPostsService");
    this.guestbookPostsRepository = new GuestbookPostsRepository();
  }

  /**
   * Create a guestbook post and register in the database
   * @param guestId Guest id
   * @param data Guestbook post data
   * @returns The guestbook post data created
   */
  public async registerPosts(
    guestId: number,
    data: CreateGuestbookPostsDTO,
  ): Promise<CreateGuestbookPostResponse> {
    this.logger
      .category("GuestbookPostsService::register")
      .level("debug")
      .description("Starting guestbook post register request")
      .add("guestId", guestId)
      .add("data", data)
      .flush();

    const guestbookPost = await this.guestbookPostsRepository.create({
      guestId,
      message: data.message,
    });

    this.logger
      .category("GuestbookPostsService::register")
      .level("debug")
      .description("Guestbook post registered")
      .add("guestbookPost", guestbookPost)
      .flush();

    return {
      id: guestbookPost.id,
      guestId: guestbookPost.guest_id,
      message: guestbookPost.message,
      createdAt: guestbookPost.created_at,
    };
  }

  /**
   * Get all guestbook posts from the database
   * @returns All guestbook posts
   */
  public async getPosts(): Promise<GuestbookPostResponse[]> {
    this.logger
      .category("GuestbookPostsService::getAll")
      .level("debug")
      .description("Getting all guestbook posts")
      .flush();

    const guestbookPosts = await this.guestbookPostsRepository.getAll();

    if (guestbookPosts === null) {
      this.logger
        .category("GuestbookPostsService::getAll")
        .level("warn")
        .description("Query doesn't apply for get all guestbook posts")
        .flush();

      return [];
    }

    this.logger
      .category("GuestbookPostsService::getAll")
      .level("debug")
      .description(`${guestbookPosts.length} guestbook posts returned`)
      .flush();

    return guestbookPosts.map((post) => ({
      id: post.guestbook_post_id,
      guestName: post.guest_name,
      message: post.guestbook_post_message,
    }));
  }
}
