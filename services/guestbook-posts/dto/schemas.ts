import { z } from "zod";

export const createGuestbookPostSchema = z.object({
  message: z.string().min(1),
});
