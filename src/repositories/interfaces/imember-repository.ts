import { Member } from "src/models/member";

export interface IMemberRepository {
  save(member: Member): Promise<void>;
  get(id: string): Promise<Member>;
  getByGuildId(guildId: string): Promise<Member[]>;
}