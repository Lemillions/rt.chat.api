import { Body, Controller, Post } from "@nestjs/common";
import { SigninService } from "src/services/auth/signin.service";

@Controller('auth')
export class LoginController {
  constructor(private readonly signinService: SigninService) {}

  @Post('/login')
  async handle(@Body() body: { email: string, password: string }) {
    const user = await this.signinService.execute(body);
    return user;
  }
}