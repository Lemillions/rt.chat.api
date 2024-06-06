import { Tb_Member } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IMemberRepository } from './interfaces/imember-repository';
import { Member } from '../models/member';

export class MemberRepository implements IMemberRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private toEntity(tb_member: Tb_Member) {
    return new Member(
      {
        guildId: tb_member.guildId,
        nickname: tb_member.nickname,
        role: tb_member.role,
        userId: tb_member.userId,
      },
      tb_member.id,
    );
  }

  async save(member: Member): Promise<void> {
    await this.prismaService.tb_Member.upsert({
      where: {
        id: member.getId(),
      },
      update: {
        guildId: member.getGuildId(),
        nickname: member.getNickname(),
        role: member.getRole(),
        userId: member.getUserId(),
      },
      create: {
        id: member.getId(),
        guildId: member.getGuildId(),
        nickname: member.getNickname(),
        role: member.getRole(),
        userId: member.getUserId(),
      },
    });
  }

  async get(id: string): Promise<Member> {
    const tb_member = await this.prismaService.tb_Member.findUnique({
      where: {
        id: id,
      },
    });

    if (!tb_member) {
      return null;
    }

    return this.toEntity(tb_member);
  }

  async getByGuildId(guildId: string): Promise<Member[]> {
    const tb_members = await this.prismaService.tb_Member.findMany({
      where: {
        guildId: guildId,
      },
    });

    return tb_members.map((tb_member) => this.toEntity(tb_member));
  }
}
