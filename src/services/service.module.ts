import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repositories/repository.module";
import { CreateChannelService } from "./channel/create-channel.service";
import { CreateGuildService } from "./guild/create-guild.service";
import { CreateMessageService } from "./message/create-message.service";
import { CreateUserService } from "./user/create-user.service";

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateChannelService,
    CreateGuildService,
    CreateMessageService,
    CreateUserService,
  ],
  exports: [
    CreateChannelService,
    CreateGuildService,
    CreateMessageService,
    CreateUserService,
  ],
})
export class ServiceModule {}