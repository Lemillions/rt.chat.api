import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [PrismaModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
