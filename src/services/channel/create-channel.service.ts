import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Channel } from '../../models/channel';
import { IChannelRepository } from '../../repositories/interfaces/ichannel-repository';
import { IGuildRepository } from '../../repositories/interfaces/iguild-repository';
import { ChannelRepository } from '../../repositories/channel-repository';
import { GuildRepository } from '../../repositories/guild-repository';
import { MemberRepository } from '../../repositories/member-repository';
import { IMemberRepository } from '../../repositories/interfaces/imember-repository';

@Injectable()
export class CreateChannelService {
  constructor(
    @Inject(ChannelRepository)
    private readonly channelRepository: IChannelRepository,
    @Inject(GuildRepository)
    private readonly guildRepository: IGuildRepository,
    @Inject(MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({userId, name, guildId, }) {
    const guild = await this.guildRepository.get(guildId);

    if (!guild) {
      throw new BadRequestException('Servidor não encontrado');
    }

    const member = await this.memberRepository.getByUserOnGuild(userId, guildId);

    if (!member) {
      throw new BadRequestException('Você não é membro deste servidor');
    }

    if (!member.isAdmin()) {
      throw new BadRequestException('Você não tem permissão para criar canais neste servidor');
    }

    const channelExists = await this.channelRepository.getByNameOnGuild(name, guildId);

    if (channelExists) {
      throw new BadRequestException('Já existe um canal com esse nome neste servidor');
    }

    const channel = Channel.create({ name, guildId });

    await this.channelRepository.save(channel);

    return channel;
  }
}
