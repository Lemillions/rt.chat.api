import { Guild } from '../../models/guild';

export interface IGuildRepository {
  save(guild: Guild);
  get(id: string): Promise<Guild>;
  getFromUser(userId: string): Promise<Guild[]>;
}
