import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserDecorator } from 'src/app/decorators/user.decorator';
import { AuthGuard } from 'src/infra/auth/guards/auth.guard';
import { User } from 'src/models/user';
import { CreateChannelService } from 'src/services/channel/create-channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('guilds/:guildId/channels')
export class CreateChannelController {
  constructor(private readonly createChannelService: CreateChannelService) {}

  @UseGuards(AuthGuard)
  @Post()
  async handle(
    @Body() body: CreateChannelDto,
    @UserDecorator() user: User,
    @Param('guildId') guildId: string,
  ) {
    return (
      await this.createChannelService.execute({
        userId: user.getId(),
        guildId,
        name: body.name,
      })
    ).toJSON();
  }
}
