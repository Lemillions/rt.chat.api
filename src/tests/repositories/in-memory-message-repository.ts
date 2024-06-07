import { Message } from "../../models/message";
import { IMessageRepository } from "../../repositories/interfaces/imessage-repository";

export class InMemoryMessageRepository implements IMessageRepository {
  private messages: Message[] = [];

  save(message: Message) {
    const index = this.messages.findIndex((m) => m.getId() === message.getId());
    if (index >= 0) {
      this.messages[index] = message;
      } else {
      this.messages.push(message);
    }
  }

  async get(id: string): Promise<Message> {
    return this.messages.find((m) => m.getId() === id);
  }

  async getByChannelId(channelId: string): Promise<Message[]> {
    return this.messages.filter((m) => m.getChannelId() === channelId);
  }
}