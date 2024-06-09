import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GuildModule } from './app/controllers/guild/guild.module';
import { ChannelModule } from './app/controllers/channel/channel.module';
import { MessageModule } from './app/controllers/message/message.module';

@Module({
  imports: [PrismaModule, GuildModule, ChannelModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
