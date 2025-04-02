import type { EventHandlerRequest, H3Event } from "h3";
import { BaseHandler } from "~/lib/common/handler/base.handler";
import { createGuestbookPostSchema } from "~/services/guestbook-posts/dto/schemas";
import { GuestbookPostsService } from "~/services/guestbook-posts/service/guestbook-posts.service";

/**
 * GuestbookPosts handler. This class exports all related operations for guestbook posts.
 */
export class GuestbookPostsHandler extends BaseHandler {
  /**
   * Builds a new GuestbookPostsHandler instance
   * @param event H3 event
   */
  constructor(event: H3Event<EventHandlerRequest>) {
    super(event);
  }

  /**
   * Register a guestbook post
   * @returns The guestbook post data created
   */
  public registerPost() {
    return this.handleRequest(
      async ({ session, body }) => {
        return new GuestbookPostsService().register(session.guestId, body);
      },
      {
        validateSession: true,
        schema: createGuestbookPostSchema,
      },
    );
  }

  /**
   * Get all guestbook posts
   * @returns All guestbook posts
   */
  public getPosts() {
    return this.handleRequest(
      async () => {
        return new GuestbookPostsService().getAll();
      },
      {
        validateSession: true,
      },
    );
  }
}
