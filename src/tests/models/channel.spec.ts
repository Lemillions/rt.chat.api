import { Channel, IChannelProps } from '../../models/channel';

describe('Channel', () => {
  it('should create a channel', () => {
    const props: IChannelProps = { name: 'Channel 1', guildId: 'guildId' };

    const channel = Channel.create(props);

    expect(channel.getName()).toBe('Channel 1');
  });

  it('should throw an error if the channel name is less than 3 characters', () => {
    const props: IChannelProps = { name: 'C1', guildId: 'guildId'};

    expect(() => Channel.create(props)).toThrow(
      'O nome do canal deve ter no mínimo 3 caracteres.',
    );
  });
});
