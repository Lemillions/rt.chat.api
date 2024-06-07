import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../app/infra/auth/auth.guard';
import { User } from '../../../models/user';

@Controller()
export class MeController {
  constructor() {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async handle(@Request() req) {
    const user: User = await req.user;
    return user.toJSON();
  }
}
