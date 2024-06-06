import { PrismaService } from '../prisma/prisma.service';
import { IChannelRepository } from './interfaces/ichannel-repository';
import { Channel } from '../models/channel';
import { Tb_Channel } from '@prisma/client';

export class ChannelRepository implements IChannelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private toEntity(tb_channel: Tb_Channel): Channel {
    return new Channel(
      {
        name: tb_channel.name,
        guildId: tb_channel.guildId,
      },
      tb_channel.id,
    );
  }

  save(channel: Channel) {
    return this.prismaService.tb_Channel.upsert({
      where: {
        id: channel.getId(),
      },
      update: {
        name: channel.getName(),
        guildId: channel.getGuildId(),
      },
      create: {
        id: channel.getId(),
        name: channel.getName(),
        guildId: channel.getGuildId(),
      },
    });
  }

  async get(id: string): Promise<Channel> {
    const tb_channel = await this.prismaService.tb_Channel.findUnique({
      where: {
        id: id,
      },
    });

    if (!tb_channel) {
      return null;
    }

    return this.toEntity(tb_channel);
  }

  async getByGuildId(guildId: string): Promise<Channel[]> {
    const tb_channels = await this.prismaService.tb_Channel.findMany({
      where: {
        guildId: guildId,
      },
    });

    return tb_channels.map((tb_channel) => this.toEntity(tb_channel));
  }

  async getByNameOnGuild(name: string, guildId: string): Promise<Channel> {
    const tb_channel = await this.prismaService.tb_Channel.findFirst({
      where: {
        name,
        guildId,
      },
    });

    if (!tb_channel) {
      return null;
    }

    return this.toEntity(tb_channel);
  }
}
