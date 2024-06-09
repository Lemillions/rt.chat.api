import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/app/decorators/user.decorator";
import { AuthGuard } from "src/infra/auth/guards/auth.guard";
import { User } from "src/models/user";
import { CreateMessageService } from "src/services/message/create-message.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller('channels/:channelId/messages')
export class CreateMessageController {
  constructor(private readonly createMessageService: CreateMessageService) {}

  @UseGuards(AuthGuard)
  @Post()
  async handle(
    @Body() body: CreateMessageDto,
    @UserDecorator() user: User,
    @Param('channelId') channelId: string,
  ) {
    return (
      await this.createMessageService.execute({
        userId: user.getId(),
        channelId,
        content: body.content,
      })
    ).toJSON();
  }
}