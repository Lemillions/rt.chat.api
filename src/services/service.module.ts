import { Module } from "@nestjs/common";
import { RepositoryModule } from "../repositories/repository.module";
import { CreateChannelService } from "./channel/create-channel.service";
import { CreateGuildService } from "./guild/create-guild.service";
import { CreateMessageService } from "./message/create-message.service";
import { CreateUserService } from "./user/create-user.service";
import { SigninService } from "./auth/signin.service";
import { JoinChannelService } from "./channel/join-channel.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [
    CreateChannelService,
    CreateGuildService,
    CreateMessageService,
    CreateUserService,
    JoinChannelService,
    SigninService,
  ],
  exports: [
    CreateChannelService,
    CreateGuildService,
    CreateMessageService,
    CreateUserService,
    JoinChannelService,
    SigninService,
  ],
})
export class ServiceModule {}