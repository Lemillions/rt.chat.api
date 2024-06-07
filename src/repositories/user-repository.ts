import { User } from '../models/user';
import { IUserRepository } from './interfaces/iuser-repository';
import { PrismaService } from '../prisma/prisma.service';
import { Tb_User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private toEntity(tb_user: Tb_User): User {
    return new User(
      {
        email: tb_user.email,
        password: tb_user.password,
        username: tb_user.username,
      },
      tb_user.id,
    );
  }

  save(user: User) {
    return this.prismaService.tb_User.upsert({
      where: {
        id: user.getId(),
      },
      update: {
        email: user.getEmail(),
        password: user.getPassword(),
        username: user.getUsername(),
      },
      create: {
        id: user.getId(),
        email: user.getEmail(),
        password: user.getPassword(),
        username: user.getUsername(),
      },
    });
  }

  async get(id: string): Promise<User> {
    const tb_user = await this.prismaService.tb_User.findUnique({
      where: {
        id: id,
      },
    });

    if (!tb_user) {
      return null;
    }

    return this.toEntity(tb_user);
  }

  async getByEmail(email: string): Promise<User> {
    const tb_user = await this.prismaService.tb_User.findUnique({
      where: {
        email: email,
      },
    });

    if (!tb_user) {
      return null;
    }

    return this.toEntity(tb_user);
  }
}
