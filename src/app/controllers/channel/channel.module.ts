import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { CreateChannelController } from './create-channel.controller';
import { GetChannelFromGuildController } from './get-channel-from-guild.controller';

@Module({
  controllers: [CreateChannelController, GetChannelFromGuildController],
  imports: [ServiceModule],
})
export class ChannelModule {}
