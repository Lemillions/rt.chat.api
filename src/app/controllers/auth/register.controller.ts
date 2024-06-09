import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from 'src/services/user/create-user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('/register')
  async handle(@Body() body: RegisterDto) {
    const user = await this.createUserService.execute(body);

    return user.toJSON();
  }
}
