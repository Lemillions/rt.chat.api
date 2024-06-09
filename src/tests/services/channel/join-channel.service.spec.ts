import { JoinChannelService } from '../../../services/channel/join-channel.service';
import { Channel } from '../../../models/channel';
import { Guild } from '../../../models/guild';
import { Member, Role } from '../../../models/member';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { InMemoryChannelRepository } from '../../../tests/repositories/in-memory-channel-repository';
import { InMemoryGuildRepository } from '../../../tests/repositories/in-memory-guild-repository.';
import { InMemoryMemberRepository } from '../../../tests/repositories/in-memory-member-repository';
import { InMemoryMessageRepository } from '../../../tests/repositories/in-memory-message-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';

describe('JoinChannelService', () => {
  it('should join a channel', async () => {
    const userRepository = new InMemoryUserRepository();
    const guildRepository = new InMemoryGuildRepository();
    const messageRepository = new InMemoryMessageRepository();
    const channelRepository = new InMemoryChannelRepository();
    const memberRepository = new InMemoryMemberRepository();

    const user = new User(
      {
        email: 'test@mail.com',
        password: 'Test@123',
        username: 'test',
      },
      'user-id',
    );

    const guild = new Guild(
      {
        name: 'test',
        description: 'description test',
      },
      'guild-id',
    );

    const channel = new Channel(
      {
        name: 'channel',
        guildId: 'guild-id',
      },
      'channel-id',
    );

    const member = new Member(
      {
        nickname: 'nickname',
        role: Role.ADMIN,
        userId: 'user-id',
        guildId: 'guild-id',
      },
      'member-id',
    );

    userRepository.save(user);
    guildRepository.save(guild);
    channelRepository.save(channel);
    memberRepository.save(member);

    const joinChannelService = new JoinChannelService(
      messageRepository,
      channelRepository,
      memberRepository,
    );

    const { messages } = await joinChannelService.execute({
      channelId: 'channel-id',
      userId: 'user-id',
    });

    // verificar que retornou as mensagens do canal
    expect(messages).toBeInstanceOf(Array<Message>);
  });

  it('should throw an error if channel not exist', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const channelRepository = new InMemoryChannelRepository();
    const memberRepository = new InMemoryMemberRepository();

    const joinChannelService = new JoinChannelService(
      messageRepository,
      channelRepository,
      memberRepository,
    );

    expect(
      joinChannelService.execute({
        channelId: 'channel-id',
        userId: 'user-id',
      }),
    ).rejects.toThrow('Canal não encontrado.');
  });

  it('should throw an error if member not exist', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const channelRepository = new InMemoryChannelRepository();
    const memberRepository = new InMemoryMemberRepository();

    const channel = new Channel(
      {
        guildId: 'guild-id',
        name: 'channel',
      },
      'channel-id',
    );

    channelRepository.save(channel);

    const joinChannelService = new JoinChannelService(
      messageRepository,
      channelRepository,
      memberRepository,
    );

    expect(
      joinChannelService.execute({
        channelId: 'channel-id',
        userId: 'user-id',
      }),
    ).rejects.toThrow('Usuário não pertence a esse servidor.');
  });
});
