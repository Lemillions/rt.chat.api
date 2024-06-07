import { Module } from "@nestjs/common";
import { ChannelRepository } from "./channel-repository";
import { GuildRepository } from "./guild-repository";
import { MemberRepository } from "./member-repository";
import { MessageRepository } from "./message-repository";
import { UserRepository } from "./user-repository";

@Module({
  providers: [
    ChannelRepository,
    GuildRepository,
    MemberRepository,
    MessageRepository,
    UserRepository,
  ],
  exports: [
    ChannelRepository,
    GuildRepository,
    MemberRepository,
    MessageRepository,
    UserRepository,
  ],
})
export class RepositoryModule {}