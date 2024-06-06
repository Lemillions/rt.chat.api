import { randomUUID } from 'crypto';

export interface IChannelProps {
  name: string;
  guildId: string;
}

export class Channel {
  private id: string;
  private props: IChannelProps = {
    name: null,
    guildId: null,
  };

  constructor(props: IChannelProps, id?: string) {
    this.setId(id || randomUUID());
    this.setName(props.name);
    this.setGuildId(props.guildId);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.props.name;
  }

  getGuildId() {
    return this.props.guildId;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    if (name.length < 3) {
      throw new Error('O nome do canal deve ter no mínimo 3 caracteres.');
    }
    this.props.name = name;
  }

  setGuildId(guildId: string) {
    this.props.guildId = guildId;
  }

  static create(props: IChannelProps) {
    return new Channel(props);
  }
}
