import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UserDecorator } from 'src/app/decorators/user.decorator';
import { AuthGuard } from 'src/infra/auth/guards/auth.guard';
import { User } from 'src/models/user';
import { GuildRepository } from 'src/repositories/guild-repository';
import { IGuildRepository } from 'src/repositories/interfaces/iguild-repository';

@Controller('guilds')
export class GetManyGuildController {
  constructor(
    @Inject(GuildRepository)
    private readonly guildRepository: IGuildRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async handle(@UserDecorator() user: User) {
    const guilds = await this.guildRepository.getFromUser(user.getId());

    return guilds.map((guild) => guild.toJSON());
  }
}
