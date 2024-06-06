import { Guild } from "../../models/guild";

describe('Guild', () => {
  it('should create a new guild', () => {
    const guildProps = {
      name: 'Guild Name',
      description: 'Guild Description',
    };

    const guild = Guild.create(guildProps);

    expect(guild.getId()).toBeDefined();
    expect(guild.getName()).toBe(guildProps.name);
    expect(guild.getDescription()).toBe(guildProps.description);
  });

  it('should throw an error if the guild name has less than 3 characters', () => {
    const guildProps = {
      name: 'A',
      description: 'Guild Description',
    };

    const createGuild = () => Guild.create(guildProps);

    expect(createGuild).toThrow('O nome do servidor deve ter no mínimo 3 caracteres.');
  });

  it('should throw an error if the guild description has less than 10 characters', () => {
    const guildProps = {
      name: 'Guild Name',
      description: 'A',
    };

    const createGuild = () => Guild.create(guildProps);

    expect(createGuild).toThrow('A descrição do servidor deve ter no mínimo 10 caracteres.');
  });
});