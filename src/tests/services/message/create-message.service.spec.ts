import { create } from 'domain';
import { Channel } from '../../../models/channel';
import { Guild } from '../../../models/guild';
import { Member, Role } from '../../../models/member';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { InMemoryChannelRepository } from '../../repositories/in-memory-channel-repository';
import { InMemoryGuildRepository } from '../../repositories/in-memory-guild-repository.';
import { InMemoryMemberRepository } from '../../repositories/in-memory-member-repository';
import { InMemoryMessageRepository } from '../../repositories/in-memory-message-repository';
import { InMemoryUserRepository } from '../../repositories/in-memory-user-repository';
import { CreateMessageService } from '../../../services/message/create-message.service';

describe('CreateMessageService', () => {
  it('should create a message', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const userRepository = new InMemoryUserRepository();
    const channelRepository = new InMemoryChannelRepository();
    const guildRepository = new InMemoryGuildRepository();
    const memberRepository = new InMemoryMemberRepository();

    const user = new User(
      {
        email: 'test@mail.com',
        username: 'test',
        password: 'Test@123',
      },
      'userId',
    );

    const guild = new Guild({
      name: 'test',
      description: 'description test',
    }, 'guildId');

    const member = new Member({
      userId: user.getId(),
      guildId: guild.getId(),
      nickname: null,
      role: Role.ADMIN
    }, 'memberId');
    
    const channel = new Channel({
      guildId: guild.getId(),
      name: 'test-channel',
    }, 'channelId');

    await userRepository.save(user);
    await guildRepository.save(guild);
    await channelRepository.save(channel);
    await memberRepository.save(member);
    

    const createMessageService = new CreateMessageService(
      messageRepository,
      channelRepository,
      memberRepository,
    );

    const message = await createMessageService.execute({
      content: 'test message',
      userId: user.getId(),
      channelId: channel.getId(),
    });

    expect(message).toBeInstanceOf(Message);
    expect(message.getContent()).toBe('test message');
    expect(message.getUserId()).toBe(user.getId());
    expect(message.getChannelId()).toBe(channel.getId());	  
  });

  it('should throw an error if the channel does not exist', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const channelRepository = new InMemoryChannelRepository();
    const memberRepository = new InMemoryMemberRepository();

    const createMessageService = new CreateMessageService(
      messageRepository,
      channelRepository,
      memberRepository,
    );

    await expect(createMessageService.execute({
      content: 'test message',
      userId: 'userId',
      channelId: 'invalid-channel-id',
    })).rejects.toThrow('Canal não encontrado.');
  });

  it('should throw an error if the member does not exist', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const channelRepository = new InMemoryChannelRepository();
    const memberRepository = new InMemoryMemberRepository();

    const createMessageService = new CreateMessageService(
      messageRepository,
      channelRepository,
      memberRepository,
    );

    const channel = new Channel({
      guildId: 'guildId',
      name: 'test-channel',
    }, 'channelId');
    
    await channelRepository.save(channel);

    await expect(createMessageService.execute({
      content: 'test message',
      userId: 'invalid-user-id',
      channelId: channel.getId(),
    })).rejects.toThrow('Usuario não pertence a esse servidor.');
  });
});
