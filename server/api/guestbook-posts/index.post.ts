import { GuestbookPostsHandler } from "~/services/guestbook-posts/handler/guestbook-posts.handler";

export default defineEventHandler((event) => {
  setResponseStatus(event, 201);
  return new GuestbookPostsHandler(event).registerPost();
});
