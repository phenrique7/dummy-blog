import { PingHandler } from "~/lib/common/handler/ping.handler";

export default defineEventHandler(
  async (event) => {
    console.log(import.meta.env);
    return await new PingHandler(event).ping()
  },
);
