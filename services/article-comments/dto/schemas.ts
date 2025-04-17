import { z } from "zod";

export const createArticleCommentBodySchema = z.object({
  articleId: z.string().min(1),
  comment: z.string().min(1).max(500),
});

export const getArticleCommentsQuerySchema = z.object({
  articleId: z.string().min(1),
});
