import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/app/decorators/user.decorator";
import { AuthGuard } from "src/infra/auth/guards/auth.guard";
import { User } from "src/models/user";
import { CreateGuildService } from "src/services/guild/create-guild.service";
import { CreateGuildDto } from "./dto/create-guild.dto";

@Controller('guilds')
export class CreateGuildController {
  constructor(private readonly createGuildService: CreateGuildService) {}

  @UseGuards(AuthGuard)
  @Post()
  async handle(@UserDecorator() user: User, @Body() body: CreateGuildDto){
    return (await this.createGuildService.execute({
      ...body,
      userId: user.getId()
    })).toJSON();
  }
}