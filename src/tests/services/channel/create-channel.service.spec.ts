import { Channel } from '../../../models/channel';
import { Guild } from '../../../models/guild';
import { InMemoryGuildRepository } from '../../../tests/repositories/in-memory-guild-repository.';
import { InMemoryChannelRepository } from '../../../tests/repositories/in-memory-channel-repository';
import { CreateChannelService } from '../../../services/channel/create-channel.service';
import { Member } from '../../../models/member';
import { InMemoryMemberRepository } from '../../../tests/repositories/in-memory-member-repository';

describe('CreateChannelService', () => {
  it('should create a channel', async () => {
    const guild = new Guild({
        name: 'guild',
        description: 'description guild',
    }, 'guildId');

    const member = new Member({
        nickname: 'nickname',
        role: 'ADMIN',
        userId: 'userId',
        guildId: 'guildId',
    }, 'memberId');

    
    const guildRepository = new InMemoryGuildRepository();
    const channelRepository = new InMemoryChannelRepository();
    const memberRepository = new InMemoryMemberRepository();
    
    guildRepository.save(guild);
    memberRepository.save(member);

    const createChannelService = new CreateChannelService(channelRepository, guildRepository, memberRepository);

    const channel = await createChannelService.execute({
        userId: 'userId',
        name: 'channel',
        guildId: 'guildId',
    });

    expect(channel).toBeInstanceOf(Channel);
    expect(channel.getName()).toBe('channel');
    expect(channel.getGuildId()).toBe('guildId');
  });

    it('should not create a channel if guild does not exist', async () => {
        const guildRepository = new InMemoryGuildRepository();
        const channelRepository = new InMemoryChannelRepository();
        const memberRepository = new InMemoryMemberRepository();
    
        const createChannelService = new CreateChannelService(channelRepository, guildRepository, memberRepository);

        expect(createChannelService.execute({
            userId: 'userId',
            name: 'channel',
            guildId: 'guildId',
        })).rejects.toThrow("Servidor não encontrado")
    });

    it('should not create a channel if user is not a member of the guild', async () => {
        const guild = new Guild({
            name: 'guild',
            description: 'description guild',
        }, 'guildId');
    
        const guildRepository = new InMemoryGuildRepository();
        guildRepository.save(guild);
    
        const channelRepository = new InMemoryChannelRepository();
        const memberRepository = new InMemoryMemberRepository();
    
        const createChannelService = new CreateChannelService(channelRepository, guildRepository, memberRepository);
    
        expect(createChannelService.execute({
            userId: 'userId',
            name: 'channel',
            guildId: 'guildId',
        })).rejects.toThrow("Você não é membro deste servidor")
    });

    it('should not create a channel if user is not an admin of the guild', async () => {
        const guild = new Guild({
            name: 'guild',
            description: 'description guild',
        }, 'guildId');
    
        const member = new Member({
            nickname: 'nickname',
            role: 'MEMBER',
            userId: 'userId',
            guildId: 'guildId',
        }, 'memberId');
    
        const guildRepository = new InMemoryGuildRepository();
        guildRepository.save(guild);
    
        const memberRepository = new InMemoryMemberRepository();
        memberRepository.save(member);
    
        const channelRepository = new InMemoryChannelRepository();
    
        const createChannelService = new CreateChannelService(channelRepository, guildRepository, memberRepository);
    
        expect(createChannelService.execute({
            userId: 'userId',
            name: 'channel',
            guildId: 'guildId',
        })).rejects.toThrow("Você não tem permissão para criar canais neste servidor")
    })

    it('should not create a channel if channel already exists', async () => {
        const guild = new Guild({
            name: 'guild',
            description: 'description guild',
        }, 'guildId');
    
        const channel = new Channel({
            name: 'channel',
            guildId: 'guildId',
        }, 'channelId');

        const member = new Member({
            nickname: 'nickname',
            role: 'ADMIN',
            userId: 'userId',
            guildId: 'guildId',
        }, 'memberId');
    
        const channelRepository = new InMemoryChannelRepository();
        const guildRepository = new InMemoryGuildRepository();
        const memberRepository = new InMemoryMemberRepository();
        
        memberRepository.save(member);
        guildRepository.save(guild);
        channelRepository.save(channel);
    
        const createChannelService = new CreateChannelService(channelRepository, guildRepository, memberRepository);
    
        expect(createChannelService.execute({
            userId: 'userId',
            name: 'channel',
            guildId: 'guildId',
        })).rejects.toThrow("Já existe um canal com esse nome neste servidor")
    });
});
