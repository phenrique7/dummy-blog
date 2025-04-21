import { z } from "zod";

export const createGuestbookPostBodySchema = z.object({
  message: z.string().min(1),
});
