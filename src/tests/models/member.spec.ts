import { Member, Role } from "../../models/member";

describe("Membrer", () => {
  it("should create a membre", () => {
    const member = Member.create({
      nickname: "nickname",
      role: Role.ADMIN,
      userId: "userId",
      guildId: "guildId",
    });

    expect(member).toBeInstanceOf(Member);
    expect(member.getId()).toBeDefined();
    expect(member.getNickname()).toBe("nickname");
    expect(member.getRole()).toBe(Role.ADMIN);
    expect(member.getUserId()).toBe("userId");
    expect(member.getGuildId()).toBe("guildId");
  });
})