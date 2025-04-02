import { GuestbookPostsHandler } from "~/services/guestbook-posts/handler/guestbook-posts.handler";

export default defineEventHandler((event) =>
  new GuestbookPostsHandler(event).getPosts(),
);
