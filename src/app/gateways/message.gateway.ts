import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageService } from '../../services/message/create-message.service';

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly createMessageService: CreateMessageService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('create-message')
  async createMessage(
    @MessageBody() data: { content: string; channelId: string; userId: string },
  ) {
    const message = await this.createMessageService.execute(data);

    this.server.to(data.channelId).emit('new-message', message);

    return message;
  }
}
