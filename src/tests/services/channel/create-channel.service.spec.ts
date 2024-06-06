import { Channel } from '../../../models/channel';
import { Guild } from '../../../models/guild';
import { InMemoryGuildRepository } from '../../../tests/repositories/in-memory-guild-repository.';
import { InMemoryChannelRepository } from '../../../tests/repositories/in-memory-channel-repository';
import { CreateChannelService } from '../../../services/channel/create-channel.service';

describe('CreateChannelService', () => {
  it('should create a channel', async () => {
    const guild = new Guild({
        name: 'guild',
        description: 'description guild',
    }, 'guildId');

    const guildRepository = new InMemoryGuildRepository();
    guildRepository.save(guild);

    const channelRepository = new InMemoryChannelRepository();

    const createChannelService = new CreateChannelService(channelRepository, guildRepository);

    const channel = await createChannelService.execute({
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
    
        const createChannelService = new CreateChannelService(channelRepository, guildRepository);

        expect(createChannelService.execute({
            name: 'channel',
            guildId: 'guildId',
        })).rejects.toThrow("Servidor não encontrado")
    });

    it('should not create a channel if channel already exists', async () => {
        const guild = new Guild({
            name: 'guild',
            description: 'description guild',
        }, 'guildId');
    
        const guildRepository = new InMemoryGuildRepository();
        guildRepository.save(guild);
    
        const channel = new Channel({
            name: 'channel',
            guildId: 'guildId',
        }, 'channelId');
    
        const channelRepository = new InMemoryChannelRepository();
        channelRepository.save(channel);
    
        const createChannelService = new CreateChannelService(channelRepository, guildRepository);
    
        expect(createChannelService.execute({
            name: 'channel',
            guildId: 'guildId',
        })).rejects.toThrow("Já existe um canal com esse nome neste servidor")
    });
});
