import { Guild } from 'src/models/guild';
import { IGuildRepository } from 'src/repositories/interfaces/iguild-repository';

export class InMemoryGuildRepository implements IGuildRepository {
  private guilds: Guild[] = [];
  get(id: string): Promise<Guild> {
    return Promise.resolve(this.guilds.find((guild) => guild.getId() === id));
  }

  save(guild: Guild) {
    const index = this.guilds.findIndex((g) => g.getId() === guild.getId());
    if (index >= 0) {
      this.guilds[index] = guild;
    } else {
      this.guilds.push(guild);
    }
  }
}
