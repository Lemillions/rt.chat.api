import { Message } from "../../models/message";

export interface IMessageRepository {
  save(message: Message);
  get(id: string): Promise<Message>;
  getByChannelId(channelId: string): Promise<Message[]>;
}