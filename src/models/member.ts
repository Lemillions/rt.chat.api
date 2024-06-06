import { Db_Role } from '@prisma/client';
import { randomUUID } from 'crypto';

export const Role = Db_Role;
export type Role = Db_Role;

export interface IMembrerProps {
  nickname: string;
  role: Role;
  userId: string;
  guildId: string;
}

export class Member {
  private id: string;
  private props: IMembrerProps = {
    nickname: null,
    role: null,
    userId: null,
    guildId: null,
  };

  constructor(props: IMembrerProps, id?: string) {
    this.setId(id || randomUUID());
    this.setNickname(props.nickname)
    this.setRole(props.role);
    this.setUserId(props.userId);
    this.setGuildId(props.guildId);
  }

  public getId(): string {
    return this.id;
  }

  public getRole(): Role {
    return this.props.role;
  }

  public getUserId(): string {
    return this.props.userId;
  }

  public getGuildId(): string {
    return this.props.guildId;
  }

  public getNickname(): string {
    return this.props.nickname;
  }

  public setId(id: string) {
    this.id = id;
  }

  public setRole(role: Role) {
    this.props.role = role;
  }

  public setUserId(userId: string) {
    this.props.userId = userId;
  }

  public setGuildId(guildId: string) {
    this.props.guildId = guildId;
  }

  public setNickname(nickname: string) {
    this.props.nickname = nickname;
  }

  static create(props: IMembrerProps): Member {
    return new Member(props);
  }
}
