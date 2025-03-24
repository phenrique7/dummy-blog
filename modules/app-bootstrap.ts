import { z } from "zod";
import { defineNuxtModule } from "nuxt/kit";
import { Logger } from "~/lib/common/logger/logger";

const environmentVariablesSchema = z.object({
  NUXT_PUBLIC_APP_URL: z.string().trim().min(1),
  NUXT_SESSION_COOKIE_PASSWORD: z.string().trim().min(1),
  NUXT_PUBLIC_GITHUB_CLIENT_ID: z.string().trim().min(1),
  NUXT_GITHUB_CLIENT_SECRET: z.string().trim().min(1),
  NUXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().trim().min(1),
  NUXT_GOOGLE_CLIENT_SECRET: z.string().trim().min(1),
  NODE_ENV: z.enum(["development", "production", "test"] as const),
});

export default defineNuxtModule({
  meta: {
    name: "app-bootstrap",
  },
  setup() {
    const logger = new Logger("app-bootstrap");

    logger
      .level("debug")
      .category("app-bootstrap::Start")
      .description("Ensuring environment variables are valid...")
      .flush();

    const envVariablesResult = environmentVariablesSchema.safeParse(
      process.env,
    );

    if (!envVariablesResult.success) {
      logger
        .level("error")
        .category("app-bootstrap::Error")
        .add("error", envVariablesResult.error.format())
        .description("❌ Invalid environment variables")
        .flush();

      throw new Error("Invalid environment variables");
    }

    logger
      .level("debug")
      .category("app-bootstrap::End")
      .description("Environment variables has been ensured!")
      .flush();
  },
});
