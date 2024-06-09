import { Module } from "@nestjs/common";
import { CreateGuildController } from "./create-guild.controller";
import { GetManyGuildController } from "./get-many-guild.controller";
import { ServiceModule } from "src/services/service.module";

@Module({
  controllers: [CreateGuildController, GetManyGuildController],
  imports: [ServiceModule],
})
export class GuildModule {}