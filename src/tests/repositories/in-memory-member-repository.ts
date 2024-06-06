import { Member } from 'src/models/member';
import { IMemberRepository } from 'src/repositories/interfaces/imember-repository';

export class InMemoryMemberRepository implements IMemberRepository {
  private members: Member[] = [];

  async get(id: string): Promise<Member> {
    return this.members.find((member) => member.getId() === id);
  }

  async getByGuildId(guildId: string): Promise<Member[]> {
    return this.members.filter((member) => member.getGuildId() === guildId);
  }

  async save(member: Member): Promise<void> {
    const index = this.members.findIndex((m) => m.getId() === member.getId());

    if (index >= 0) {
      this.members[index] = member;
    } else {
      this.members.push(member);
    }
  }
}
