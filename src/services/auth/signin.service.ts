import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/interfaces/iuser-repository';
import { UserRepository } from '../../repositories/user-repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }) {
    const user = await this.userRepository.getByEmail(email);

    if (!user || !user.checkPassword(password)) {
      throw new Error('Email ou senha inválidos.');
    }

    const payload = { sub: user.getId(), email: user.getEmail() };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
