import { BadRequestException, Inject, Injectable, } from "@nestjs/common";
import { Message } from "../../models/message";
import { ChannelRepository } from "../../repositories/channel-repository";
import { IChannelRepository } from "../../repositories/interfaces/ichannel-repository";
import { IMemberRepository } from "../../repositories/interfaces/imember-repository";
import { IMessageRepository } from "../../repositories/interfaces/imessage-repository";
import { MemberRepository } from "../../repositories/member-repository";
import { MessageRepository } from "../../repositories/message-repository";
import { MessagesGateway } from "../../app/gateways/message.gateway";
import { UserRepository } from "../../repositories/user-repository";
import { IUserRepository } from "../../repositories/interfaces/iuser-repository";

@Injectable()
export class CreateMessageService {
  constructor(
    @Inject(MessageRepository)
    private readonly messageRepository: IMessageRepository,
    @Inject(ChannelRepository)
    private readonly channelRepository: IChannelRepository,
    @Inject(MemberRepository)
    private readonly memberRepository: IMemberRepository,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  async execute({
    content,
    channelId,
    userId,
  }: {
    content: string;
    channelId: string;
    userId: string;
  }) {
    const channel = await this.channelRepository.get(channelId);

    if (!channel) {
      throw new BadRequestException("Canal não encontrado.");
    }

    const member = await this.memberRepository.getByUserOnGuild(userId, channel.getGuildId());

    if (!member) {
      throw new BadRequestException("Usuario não pertence a esse servidor.");
    }

    const user = await this.userRepository.get(userId);

    const message = Message.create({ content, channelId, userId });

    await this.messageRepository.save(message);

    this.messagesGateway.trigerEvent(channelId, "messageCreated", {
      ...message.toJSON(),
      user: user.toJSON(),
    });

    return message;
  }
}