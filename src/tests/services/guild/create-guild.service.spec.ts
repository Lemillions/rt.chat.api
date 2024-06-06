import { CreateGuildService } from '../../../services/guild/create-guild.service';
import { Guild } from '../../../models/guild';
import { Role } from '../../../models/member';
import { User } from '../../../models/user';
import { InMemoryGuildRepository } from '../../../tests/repositories/in-memory-guild-repository.';
import { InMemoryMemberRepository } from '../../../tests/repositories/in-memory-member-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';

describe('CreateGuildService', () => {
  it('should create a guild', async () => {
    const guildRepository = new InMemoryGuildRepository();
    const userRepository = new InMemoryUserRepository();
    const memberRepository = new InMemoryMemberRepository();

    const user = new User(
      {
        email: 'owner@mail.com',
        username: 'owner',
        password: 'Test@123',
      },
      'ownerId',
    );

    await userRepository.save(user);

    const createGuildService = new CreateGuildService(
      guildRepository,
      userRepository,
      memberRepository,
    );

    const guild: Guild = await createGuildService.execute({
      guildName: 'test',
      userId: 'ownerId',
      description: 'description test',
    });

    expect(guild).toBeTruthy();
    expect(guild).toBe(await guildRepository.get(guild.getId()));
    expect(guild.getId()).toBeTruthy();
    expect(guild.getName()).toBe('test');
    expect(guild.getDescription()).toBe('description test');

    const members = await memberRepository.getByGuildId(guild.getId());

    expect(members).toHaveLength(1);
    expect(members[0].getUserId()).toBe('ownerId');
    expect(members[0].getGuildId()).toBe(guild.getId());
    expect(members[0].getRole()).toBe(Role.ADMIN);
  });

  it('should throw an error if the owner does not exist', async () => {
    const guildRepository = new InMemoryGuildRepository();
    const userRepository = new InMemoryUserRepository();
    const memberRepository = new InMemoryMemberRepository();

    const createGuildService = new CreateGuildService(
      guildRepository,
      userRepository,
      memberRepository,
    );

    await expect(
      createGuildService.execute({
        guildName: 'test',
        userId: 'ownerId',
        description: 'description test',
      }),
    ).rejects.toThrow('Usuário não encontrado.');
  });
});
