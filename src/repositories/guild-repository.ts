import { PrismaService } from '../prisma/prisma.service';
import { IGuildRepository } from './interfaces/iguild-repository';
import { Guild } from '../models/guild';
import { Tb_Guild } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuildRepository implements IGuildRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private toEntity(tb_guild: Tb_Guild): Guild {
    return new Guild(
      {
        name: tb_guild.name,
        description: tb_guild.description,
      },
      tb_guild.id,
    );
  }

  save(guild: Guild) {
    return this.prismaService.tb_Guild.upsert({
      where: {
        id: guild.getId(),
      },
      update: {
        name: guild.getName(),
        description: guild.getDescription(),
      },
      create: {
        id: guild.getId(),
        name: guild.getName(),
        description: guild.getDescription(),
      },
    });
  }

  async get(id: string): Promise<Guild> {
    const tb_guild = await this.prismaService.tb_Guild.findUnique({
      where: {
        id: id,
      },
    });

    if (!tb_guild) {
      return null;
    }

    return this.toEntity(tb_guild);
  }

  async getFromUser(userId: string): Promise<Guild[]> {
    const tb_guild = await this.prismaService.tb_Guild.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    });

    return tb_guild.map((guild) => this.toEntity(guild));
  }
}
