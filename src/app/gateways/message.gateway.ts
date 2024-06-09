import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../repositories/interfaces/iuser-repository';
import { UserRepository } from '../../repositories/user-repository';
import { JoinChannelService } from '../../services/channel/join-channel.service';
import { WsAuthGuard } from '../../infra/auth/guards/ws-auth.guard';

@WebSocketGateway({ cors: '*' })
export class MessagesGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private channels: Map<string, Set<{ socket: Socket; userId: string }>> =
    new Map();

  constructor(
    private jwtService: JwtService,
    private readonly joinChannelService: JoinChannelService,
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  trigerEvent(channelId: string, event: string, data: any) {
    this.server.to(channelId).emit(event, data);
  }

  handleDisconnect(client: Socket) {
    this.channels.forEach((sockets, channelId) => {
      // Encontrar o objeto que contém o socket que está se desconectando
      const socketToRemove = Array.from(sockets).find(
        (s) => s.socket.id === client.id,
      );
      // Se encontrado, removê-lo do conjunto
      if (socketToRemove) {
        sockets.delete(socketToRemove);
      }
      // Se o conjunto de sockets estiver vazio após a remoção, deletar o canal do mapa
      if (sockets.size === 0) {
        this.channels.delete(channelId);
      }
    });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinChannel')
  async handleJoinChannel(client: Socket, channelId: string) {
    const user = client.data.user.getId();
    const { messages, channel } = await this.joinChannelService.execute({
      channelId,
      userId: client.data.user.id,
    });

    if (!this.channels.has(channelId)) {
      this.channels.set(channelId, new Set());
    }

    this.channels.get(channelId).add({
      socket: client,
      userId: user,
    });

    client.join(channelId);

    return {
      ...channel.toJSON(),
      messages: messages.map((message) => {
        return {
          ...message.message.toJSON(),
          user: message.user.toJSON(),
        };
      }),
    };
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('leaveChannel')
  handleLeaveChannel(client: Socket, channelId: string) {
    const sockets = this.channels.get(channelId);
    if (sockets) {
      sockets.delete({
        socket: client,
        userId: client.data.user.id,
      });
      if (sockets.size === 0) {
        this.channels.delete(channelId);
      }
    }
    client.leave(channelId);
  }
}
