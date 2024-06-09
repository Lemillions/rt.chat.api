
import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/infra/auth/guards/auth.guard';
import { ChannelRepository } from 'src/repositories/channel-repository';
import { IChannelRepository } from 'src/repositories/interfaces/ichannel-repository';

@Controller('guilds/:guildId/channels')
export class GetChannelFromGuildController {
  constructor(
    @Inject(ChannelRepository)
    private readonly channelRepository: IChannelRepository) {}

  @UseGuards(AuthGuard)
  @Get()
  async han9dle(@Param('guildId') guildId: string) {
    const channels = await this.channelRepository.getByGuildId(guildId);

    return channels.map((channel) => channel.toJSON());
  }
}