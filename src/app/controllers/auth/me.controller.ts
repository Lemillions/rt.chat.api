import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../infra/auth/guards/auth.guard';
import { User } from '../../../models/user';
import { UserDecorator } from 'src/app/decorators/user.decorator';

@Controller()
export class MeController {
  constructor() {}

  @Get('/user')
  @UseGuards(AuthGuard)
  async handle(@UserDecorator() user: User) {
    return user.toJSON();
  }
}
