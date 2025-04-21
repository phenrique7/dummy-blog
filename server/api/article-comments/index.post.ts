import { ArticleCommentsHandler } from "~/services/article-comments/handler/article-comments.handler";

export default defineEventHandler((event) => {
  setResponseStatus(event, 201);
  return new ArticleCommentsHandler(event).store();
});
