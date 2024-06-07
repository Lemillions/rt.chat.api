import { PrismaService } from '../prisma/prisma.service';
import { Message } from '../models/message';
import { IMessageRepository } from './interfaces/imessage-repository';
import { Tb_Message } from '@prisma/client';

export class MessageRepository implements IMessageRepository {
  constructor(private readonly prismaService: PrismaService) {}
  private toEntity(tb_message: Tb_Message): Message {
    return new Message(
      {
        content: tb_message.content,
        userId: tb_message.userId,
        channelId: tb_message.channelId,
      },
      tb_message.id,
    );
  }

  save(message: Message) {
    return this.prismaService.tb_Message.upsert({
      where: { id: message.getId() },
      update: {
        content: message.getContent(),
        userId: message.getUserId(),
        channelId: message.getChannelId(),
      },
      create: {
        id: message.getId(),
        content: message.getContent(),
        userId: message.getUserId(),
        channelId: message.getChannelId(),
      },
    });
  }

  async get(id: string): Promise<Message> {
    const tb_message = await this.prismaService.tb_Message.findUnique({
      where: { id },
    });

    if (!tb_message) {
      return null;
    }

    return this.toEntity(tb_message);
  }

  async getByChannelId(channelId: string): Promise<Message[]> {
    const tb_messages = await this.prismaService.tb_Message.findMany({
      where: { channelId },
    });

    return tb_messages.map((tb_message) => this.toEntity(tb_message));
  }
}
