import { BaseRepository } from "~/lib/common/repository/base-repository";
import type {
  GuestDDB,
  CreateGuestDTO,
  GuestFilterDTO,
} from "~/services/guest/dto/guest.dto";

export class GuestRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Create a session in the database
   * @param guest
   */
  public async create(guest: CreateGuestDTO): Promise<GuestDDB> {
    const stmt = this.db
      .prepare(
        "INSERT INTO guests (name, provider, provider_id, created_at) VALUES (?1, ?2, ?3, ?4)",
      )
      .bind(
        guest.name,
        guest.provider,
        guest.providerId,
        Math.floor(Date.now() / 1000),
      );

    const result = await stmt.run();

    return result.results[0] as GuestDDB;
  }

  /**
   * Filter a guest by its providerId
   * @param params
   */
  public async filter(params: GuestFilterDTO): Promise<GuestDDB | null> {
    const stmt = this.db
      .prepare("SELECT * FROM guests WHERE provider_id = ?1")
      .bind(params.providerId);

    return stmt.first<GuestDDB>();
  }
}
