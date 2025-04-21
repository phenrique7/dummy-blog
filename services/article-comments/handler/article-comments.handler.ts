import { z } from "zod";
import type { EventHandlerRequest, H3Event } from "h3";
import { BaseHandler } from "~/lib/common/handler/base.handler";
import { ArticleCommentsService } from "~/services/article-comments/service/article-comments.service";
import {
  getArticleCommentsQuerySchema,
  createArticleCommentBodySchema,
} from "~/services/article-comments/dto/schemas";

/**
 * ArticleComments handler. This class exports all related operations for article comments.
 */
export class ArticleCommentsHandler extends BaseHandler {
  private readonly articleCommentsService: ArticleCommentsService;

  /**
   * Builds a new ArticleCommentsHandler instance
   * @param event H3 event
   */
  constructor(event: H3Event<EventHandlerRequest>) {
    super(event);
    this.articleCommentsService = new ArticleCommentsService();
  }

  /**
   * Get all comments for a specific article
   * @resource article-comments
   * @method GET
   * @path /api/article-comments
   *
   * @param {object} query - Query parameters
   * @param {string} query.articleId - The ID of the article to fetch comments for
   *
   * @returns A list of comments for the specified article
   *
   * @example
   * // Request
   * GET /api/article-comments?articleId=article/posts/foo-bar.md
   *
   * // Response
   * [
   *   {
   *     id: 1,
   *     comment: "Great article!",
   *     guestName: "John Doe",
   *     createdAt: "2021-01-01T00:00:00.000Z"
   *   }
   * ]
   */
  public index() {
    return this.handleRequest<
      null,
      z.infer<typeof getArticleCommentsQuerySchema>
    >(
      ({ query }) =>
        this.articleCommentsService.getComments(query.articleId),
      {
        querySchema: getArticleCommentsQuerySchema,
      },
    );
  }

  /**
   * Register an article comment
   * @resource article-comments
   * @method POST
   * @path /api/article-comments
   *
   * @param {object} body - Request body
   * @param {string} body.articleId - The ID of the article to post a comment for
   * @param {string} body.comment - The comment to be posted
   *
   * @returns The article comment data created
   *
   * @example
   * // Request
   * POST /api/article-comments
   * {
   *   articleId: "article/posts/foo-bar.md",
   *   comment: "Great article!"
   * }
   *
   * // Response
   * {
   *   id: 1,
   *   comment: "Great article!",
   *   guestName: "John Doe",
   *   createdAt: "2021-01-01T00:00:00.000Z"
   * }
   */
  public store() {
    return this.handleRequest<
      z.infer<typeof createArticleCommentBodySchema>
    >(
      ({ session, body }) =>
        this.articleCommentsService.registerComment({
          comment: body.comment,
          guestId: session.guestId,
          articleId: body.articleId,
        }),
      {
        validateSession: true,
        bodySchema: createArticleCommentBodySchema,
      },
    );
  }
}
