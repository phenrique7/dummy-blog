export type SessionDDB = {
  id: number;
  guest_id: number;
  expires_at: number;
  created_at: number;
};

export type CreateSessionDTO = {
  guestId: number;
  expiresAt: Date;
};

export type UpdateSessionDTO = {
  expiresAt: number;
};
