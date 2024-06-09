import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { IUserRepository } from '../../../repositories/interfaces/iuser-repository';
import { UserRepository } from '../../../repositories/user-repository';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const token = this.extractTokenFromHandshake(client);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userRepository.get(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      client.data["user"] = user;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }

  private extractTokenFromHandshake(client: Socket): string | undefined {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    return token;
  }
}
