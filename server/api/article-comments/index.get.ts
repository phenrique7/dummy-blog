import { ArticleCommentsHandler } from "~/services/article-comments/handler/article-comments.handler";

export default defineEventHandler((event) =>
  new ArticleCommentsHandler(event).index(),
);
