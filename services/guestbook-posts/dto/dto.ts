export type CreateGuestbookPostsDTO = {
  message: string;
};

export type GuestbookPostDTO = {
  guestId: number;
  message: string;
};

export type GuestbookPostDDB = {
  id: number;
  guest_id: number;
  message: string;
  created_at: number;
};

export type GuestbookPostAliasDDB = {
  guest_name: string;
  guestbook_post_id: number;
  guestbook_post_message: string;
  guestbook_post_created_at: string;
};

export type CreateGuestbookPostResponse = {
  id: number;
  guestId: number;
  message: string;
  createdAt: number;
};

export type GuestbookPostResponse = {
  id: number;
  message: string;
  guestName: string;
};
