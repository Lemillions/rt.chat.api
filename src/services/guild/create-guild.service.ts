import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Guild } from '../../models/guild';
import { Member, Role } from '../../models/member';
import { IGuildRepository } from '../../repositories/interfaces/iguild-repository';
import { IMemberRepository } from '../../repositories/interfaces/imember-repository';
import { IUserRepository } from '../../repositories/interfaces/iuser-repository';
import { GuildRepository } from '../../repositories/guild-repository';
import { UserRepository } from '../../repositories/user-repository';
import { MemberRepository } from '../../repositories/member-repository';

@Injectable()
export class CreateGuildService {
  constructor(
    @Inject(GuildRepository)
    private readonly guildRepository: IGuildRepository,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({
    userId,
    guildName,
    description
  }: {
    userId: string;
    guildName: string;
    description: string;
  }): Promise<Guild> {
    const user = await this.userRepository.get(userId);

    if (!user) {
        throw new BadRequestException("Usuário não encontrado.")
    }

    const guild = Guild.create({ name: guildName, description });

    const member = new Member({
      guildId: guild.getId(),
      nickname: null,
      role: Role.ADMIN,
      userId: user.getId(),
    });

    await this.guildRepository.save(guild);
    await this.memberRepository.save(member);

    return guild;
  }
}
