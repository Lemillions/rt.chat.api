import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../models/message';
import { ChannelRepository } from '../../repositories/channel-repository';
import { IChannelRepository } from '../../repositories/interfaces/ichannel-repository';
import { IMemberRepository } from '../../repositories/interfaces/imember-repository';
import { IMessageRepository } from '../../repositories/interfaces/imessage-repository';
import { MemberRepository } from '../../repositories/member-repository';
import { MessageRepository } from '../../repositories/message-repository';
import { Channel } from 'src/models/channel';
import { User } from 'src/models/user';

@Injectable()
export class JoinChannelService {
  constructor(
    @Inject(MessageRepository)
    private messageRepository: IMessageRepository,
    @Inject(ChannelRepository)
    private channelRepository: IChannelRepository,
    @Inject(MemberRepository)
    private memberRepository: IMemberRepository,
  ) {}

  async execute({
    channelId,
    userId,
  }: {
    channelId: string;
    userId: string;
  }): Promise<{
    channel: Channel;
    messages: { message: Message; user: User }[];
  }> {
    const channel = await this.channelRepository.get(channelId);

    if (!channel) {
      throw new Error('Canal não encontrado.');
    }

    const member = await this.memberRepository.getByUserOnGuild(
      userId,
      channel.getGuildId(),
    );

    if (!member) {
      throw new Error('Usuário não pertence a esse servidor.');
    }

    const messages = await this.messageRepository.getByChannelIdWithUser(channelId);

    return {
      channel,
      messages,
    };
  }
}
