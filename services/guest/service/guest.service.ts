import { Logger } from "~/lib/common/logger/logger";
import { GuestRepository } from "~/services/guest/repository/guest.repository";
import type {
  GuestDTO,
  CreateGuestDTO,
} from "~/services/guest/dto/guest.dto";

export class GuestService {
  private readonly logger: Logger;
  private readonly guestRepository: GuestRepository;

  constructor() {
    this.logger = new Logger("GuestService");
    this.guestRepository = new GuestRepository();
  }

  public async createGuest(guest: CreateGuestDTO): Promise<GuestDTO> {
    this.logger
      .level("debug")
      .category("createGuest::Start")
      .add("guest", guest)
      .description("Starting guest register process...")
      .flush();

    const result = await this.guestRepository.create(guest);

    const newGuest = {
      id: result.id,
      name: result.name,
      provider: result.provider,
      providerId: result.provider_id,
      createdAt: result.created_at,
    };

    this.logger
      .level("debug")
      .category("createGuest::Result")
      .add("guest", newGuest)
      .flush();

    return newGuest;
  }

  /**
   * Get guest by its provider id
   * @param providerId Provider id of the guest
   * @returns GuestDTO or null if not found
   */
  public async getByProviderId(
    providerId: string,
  ): Promise<GuestDTO | null> {
    this.logger
      .level("debug")
      .category("getByProviderId::Start")
      .add("providerId", providerId)
      .flush();

    const guestResult = await this.guestRepository.filter({ providerId });

    if (guestResult === null) {
      this.logger
        .level("info")
        .category("getByProviderId::Result")
        .description(`No guest found with provider id ${providerId}`)
        .flush();

      return null;
    }

    const guest = {
      id: guestResult.id,
      name: guestResult.name,
      provider: guestResult.provider,
      providerId: guestResult.provider_id,
      createdAt: guestResult.created_at,
    };

    this.logger
      .level("debug")
      .category("getByProviderId::Result")
      .add("guest", guest)
      .flush();

    return guest;
  }
}
