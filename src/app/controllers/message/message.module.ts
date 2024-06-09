import { Module } from "@nestjs/common";
import { CreateMessageController } from "./create-message.controller";
import { ServiceModule } from "src/services/service.module";

@Module({
  imports: [ServiceModule],
  controllers: [CreateMessageController],
  providers: [],
})
export class MessageModule {}