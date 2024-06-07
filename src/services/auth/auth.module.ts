import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from 'src/repositories/repository.module';
import { MeController } from 'src/app/controllers/auth/me.controller';
import { LoginController } from 'src/app/controllers/auth/login.controller';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [SigninService],
  controllers: [MeController, LoginController],
  exports: [SigninService],
})
export class AuthModule {}