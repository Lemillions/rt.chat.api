import { Channel } from '../../models/channel';
import { IChannelRepository } from '../../repositories/interfaces/ichannel-repository';

export class InMemoryChannelRepository implements IChannelRepository {
  private channels: Channel[] = [];

  save(channel: Channel) {
    const index = this.channels.findIndex((c) => c.getId() === channel.getId());
    if (index >= 0) {
      this.channels[index] = channel;
    } else {
      this.channels.push(channel);
    }
  }

  async get(id: string): Promise<Channel> {
    return this.channels.find((c) => c.getId() === id);
  }

  async getByGuildId(guildId: string): Promise<Channel[]> {
    return this.channels.filter((c) => c.getId() === guildId);
  }

  async getByNameOnGuild(name: string, guildId: string): Promise<Channel> {
    return this.channels.find((c) => c.getName() === name && c.getGuildId() === guildId);
  }
}
