import { User } from "src/models/user";
import { Message } from "../../models/message";

export interface IMessageRepository {
  save(message: Message);
  get(id: string): Promise<Message>;
  getByChannelId(channelId: string): Promise<Message[]>;
  // funcao que retorna todas as mensagens de um canal mas tambem retorna o usuario que enviou a mensagem
  getByChannelIdWithUser(channelId: string): Promise<{
    message: Message;
    user: User;
  }[]>;
}