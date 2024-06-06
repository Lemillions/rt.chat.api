import { Channel } from "../../models/channel";

export interface IChannelRepository {
    save(channel: Channel);
    get(id: string): Promise<Channel>;
    getByGuildId(guildId: string): Promise<Channel[]>;
    getByNameOnGuild(name: string, guildId: string): Promise<Channel>;
}