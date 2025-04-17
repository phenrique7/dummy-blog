import { BaseRepository } from "~/lib/common/repository/base-repository";
import type {
  ArticleCommentDDB,
  CreateArticleCommentDTO,
  ArticleCommentAliasDDB,
} from "~/services/article-comments/dto/dto";

export class ArticleCommentsRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Retrieves an article comment from the database based on the provided comment ID.
   *
   * @param {number} commentId - The ID of the comment to retrieve.
   * @return A promise resolving to the retrieved comment data as an ArticleCommentAliasDDB object or null if no comment is found.
   */
  public async get(
    commentId: number,
  ): Promise<ArticleCommentAliasDDB | null> {
    const stmt = this.db
      .prepare(
        `
        SELECT
          AC.id AS article_comment_id,
          AC.comment AS article_comment_text_comment,
          AC.created_at AS article_comment_created_at,
          G.name AS article_comment_guest_name
        FROM article_comments AS AC
               INNER JOIN guests AS G ON AC.guest_id = G.id
        WHERE AC.article_id = ?1
      `,
      )
      .bind(commentId);

    return stmt.first<ArticleCommentAliasDDB>();
  }

  /**
   * Get all comments in the database by article id
   * @param articleId Article id; not a number, but a string/path (article/posts/be-who-you-are.md)
   * @returns All article comments
   */
  public async getAllByArticleId(
    articleId: string,
  ): Promise<ArticleCommentAliasDDB[] | null> {
    const stmt = this.db
      .prepare(
        `
          SELECT
            AC.id AS article_comment_id,
            AC.comment AS article_comment_text_comment,
            AC.created_at AS article_comment_created_at,
            G.name AS article_comment_guest_name
          FROM article_comments AS AC
                 INNER JOIN guests AS G ON AC.guest_id = G.id
          WHERE AC.article_id = ?1
          ORDER BY AC.created_at DESC
      `,
      )
      .bind(articleId);

    const { results } = await stmt.all<ArticleCommentAliasDDB>();

    return results;
  }

  /**
   * Create an article comment in the database
   * @param articleComment Article comment data
   * @returns The comment data created
   */
  public async create(
    articleComment: CreateArticleCommentDTO,
  ): Promise<ArticleCommentDDB> {
    const stmt = this.db
      .prepare(
        "INSERT INTO article_comments (guest_id, article_id, comment, created_at) VALUES (?1, ?2, ?3, ?4) RETURNING id, guest_id, article_id, comment, created_at",
      )
      .bind(
        articleComment.guestId,
        articleComment.articleId,
        articleComment.comment,
        Math.floor(Date.now() / 1000),
      );

    const { results } = await stmt.run<ArticleCommentDDB>();

    return results[0];
  }
}
