import { Logger } from "~/lib/common/logger/logger";
import { NotFoundException } from "~/lib/common/exception/not-found.exception";
import { ArticleCommentsRepository } from "~/services/article-comments/repository/article-comments.repository";
import type {
  GetArticleCommentDTO,
  CreateArticleCommentDTO,
} from "~/services/article-comments/dto/dto";

export class ArticleCommentsService {
  private readonly logger: Logger;
  private readonly articleCommentsRepository: ArticleCommentsRepository;

  constructor() {
    this.logger = new Logger("ArticleCommentsService");
    this.articleCommentsRepository = new ArticleCommentsRepository();
  }

  /**
   * Get all comments for specified article
   * @param articleId Article id
   *
   * @returns The comments for the specified article or warn a message if not found
   */
  public async getComments(
    articleId: string,
  ): Promise<GetArticleCommentDTO[]> {
    this.logger
      .level("debug")
      .category("ArticleCommentsService::getComments:initial")
      .description("Getting all article comments")
      .flush();

    const comments =
      await this.articleCommentsRepository.getAllByArticleId(articleId);

    if (comments === null) {
      this.logger
        .category("ArticleCommentsService::getComments:notFoundComments")
        .level("warn")
        .description("Query doesn't apply for get all article comments")
        .flush();

      return [];
    }

    this.logger
      .category("ArticleCommentsService::getComments:commentsReturned")
      .level("debug")
      .description(
        `${comments.length} comments returned for the article ${articleId}`,
      )
      .flush();

    return comments.map((comment) => ({
      id: comment.article_comment_id,
      guestName: comment.article_comment_guest_name,
      comment: comment.article_comment_text_comment,
      createdAt: comment.article_comment_created_at,
    }));
  }

  /**
   * Create a comment, register in the database and return the comment created as an ArticleCommentDTO object.
   * @param data Comment data together with guest id
   *
   * @returns The comment data created or undefined if not found
   */
  public async registerComment(
    data: CreateArticleCommentDTO,
  ): Promise<GetArticleCommentDTO> {
    this.logger
      .level("debug")
      .category("ArticleCommentsService::registerComment:initial")
      .description("Starting article comment register request")
      .add("data", data)
      .flush();

    const commentCreated =
      await this.articleCommentsRepository.create(data);

    this.logger
      .level("debug")
      .category(
        "ArticleCommentsService::registerComment:commentRegistered",
      )
      .description("Article comment registered")
      .add("comment", commentCreated);

    const comment = await this.articleCommentsRepository.get(
      commentCreated.id,
    );

    if (comment === null) {
      this.logger
        .level("error")
        .category(
          "ArticleCommentsService::registerComment:commentNotFound",
        )
        .description("Comment created not found")
        .flush();

      throw new NotFoundException("No comment found");
    }

    return {
      id: comment.article_comment_id,
      guestName: comment.article_comment_guest_name,
      comment: comment.article_comment_text_comment,
      createdAt: comment.article_comment_created_at,
    };
  }
}
