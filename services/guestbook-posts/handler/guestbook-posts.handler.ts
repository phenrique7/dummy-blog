import type { EventHandlerRequest, H3Event } from "h3";
import { BaseHandler } from "~/lib/common/handler/base.handler";
import { createGuestbookPostBodySchema } from "~/services/guestbook-posts/dto/schemas";
import { GuestbookPostsService } from "~/services/guestbook-posts/service/guestbook-posts.service";
import { z } from "zod";

/**
 * GuestbookPosts handler. This class exports all related operations for guestbook posts.
 */
export class GuestbookPostsHandler extends BaseHandler {
  private readonly guestbookPostsService: GuestbookPostsService;

  /**
   * Builds a new GuestbookPostsHandler instance
   * @param event H3 event
   */
  constructor(event: H3Event<EventHandlerRequest>) {
    super(event);
    this.guestbookPostsService = new GuestbookPostsService();
  }

  /**
   * Get all guestbook posts
   * @resource guestbook-posts
   * @method GET
   * @path /api/guestbook-posts
   *
   * @returns All guestbook posts
   * @example
   * // Request
   * GET /api/guestbook-posts
   *
   * // Response
   * [
   *   {
   *     id: 1,
   *     message: "Great article!",
   *     guestName: "John Doe",
   *   }
   * ]
   */
  public index() {
    return this.handleRequest(() => this.guestbookPostsService.getPosts());
  }

  /**
   * Register a guestbook post
   * @resource guestbook-posts
   * @method POST
   * @path /api/guestbook-posts
   *
   * @param {object} body - Request body
   * @param {string} body.message - The message to be posted
   *
   * @returns The guestbook post data created
   *
   * @example
   * // Request
   * POST /api/guestbook-posts
   * {
   *   message: "Great article!"
   * }
   *
   * // Response
   * {
   *   id: 1,
   *   message: "Great article!",
   *   guestName: "John Doe",
   * }
   */
  public store() {
    return this.handleRequest<
      z.infer<typeof createGuestbookPostBodySchema>
    >(
      ({ session, body }) =>
        this.guestbookPostsService.registerPosts(session.guestId, body),
      {
        validateSession: true,
        bodySchema: createGuestbookPostBodySchema,
      },
    );
  }
}
