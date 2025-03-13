export type GuestDDB = {
  id: number;
  name: string;
  provider: string;
  provider_id: string;
  created_at: number;
};

export type GuestDTO = {
  id: number;
  name: string;
  provider: string;
  providerId: string;
  createdAt: number;
};

export type CreateGuestDTO = {
  name: string;
  provider: string;
  providerId: string;
};

export type GuestFilterDTO = {
  providerId: string;
};
