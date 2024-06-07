import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Channel } from '../../models/channel';
import { IChannelRepository } from '../../repositories/interfaces/ichannel-repository';
import { IGuildRepository } from '../../repositories/interfaces/iguild-repository';
import { ChannelRepository } from 'src/repositories/channel-repository';
import { GuildRepository } from 'src/repositories/guild-repository';

@Injectable()
export class CreateChannelService {
  constructor(
    @Inject(ChannelRepository)
    private readonly channelRepository: IChannelRepository,
    @Inject(GuildRepository)
    private readonly guildRepository: IGuildRepository,
  ) {}

  async execute({ name, guildId }) {
    const guild = await this.guildRepository.get(guildId);

    if (!guild) {
      throw new BadRequestException('Servidor não encontrado');
    }

    const channelExists = await this.channelRepository.getByNameOnGuild(name, guildId);

    if (channelExists) {
      throw new BadRequestException('Já existe um canal com esse nome neste servidor');
    }

    const channel = Channel.create({ name, guildId });

    this.channelRepository.save(channel);

    return channel;
  }
}
