export type ArticleCommentDDB = {
  id: number;
  text: string;
  guest_id: number;
  article_id: string;
  created_at: number;
};

export type ArticleCommentAliasDDB = {
  article_comment_id: number;
  article_comment_text_comment: string;
  article_comment_created_at: number;
  article_comment_guest_name: string;
};

export type CreateArticleCommentDTO = {
  comment: string;
  guestId: number;
  articleId: string;
};

export type GetArticleCommentDTO = {
  id: number;
  comment: string;
  guestName: string;
  createdAt: number;
};
