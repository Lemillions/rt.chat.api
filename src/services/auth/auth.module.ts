import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from 'src/repositories/repository.module';
import { MeController } from 'src/app/controllers/auth/me.controller';
import { LoginController } from 'src/app/controllers/auth/login.controller';
import { RegisterController } from 'src/app/controllers/auth/register.controller';
import { CreateUserService } from '../user/create-user.service';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [SigninService, CreateUserService],
  controllers: [MeController, LoginController, RegisterController],
  exports: [SigninService],
})
export class AuthModule {}