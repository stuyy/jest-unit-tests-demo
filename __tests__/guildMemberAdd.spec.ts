import { GuildMember, Role, TextChannel } from "discord.js";
import { guildMemberAddHandler } from "../src/handlers";
import {
  getGuildMemberMock,
  getRoleMock,
  getTextChannelMock,
} from "../__mocks__";

describe("GuildMemberAdd Handler", () => {
  const memberMock = getGuildMemberMock();
  const roleMock: Role = getRoleMock();
  const textChannelMock = getTextChannelMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sends a message to a channel when the role is not found", async () => {
    // We mock the implementation once for the roles.cache.get() function to return undefined
    jest
      .spyOn(memberMock.guild.roles.cache, "get")
      .mockImplementationOnce((): any => undefined);
    // We mock the implementation of guild.channels.cache.get() to return a text channel
    // So it will check the case to send the specific channel a message if the role was not found.
    jest
      .spyOn(memberMock.guild.channels.cache, "get")
      .mockImplementationOnce((): any => textChannelMock);
    // Call the Function with our GuildMember Mock
    await guildMemberAddHandler(memberMock);
    // It should not call roles.add because no role was found.
    expect(memberMock.roles.add).toHaveBeenCalledTimes(0);
    // Since an error is to be thrown, we test if a channel is being searched for
    expect(memberMock.guild.channels.cache.get).toHaveBeenCalledTimes(1);
    // Since we mocked the implementation of memberMock.guild.channels.cache.get to return a text channel,
    // We ensure textChannel.send was called once.
    expect(textChannelMock.send).toHaveBeenCalledTimes(1);
    // Assert textChannelMock.send was called with the correct argument.
    expect(textChannelMock.send).toHaveBeenCalledWith(
      "Role was not added to the member because it was not found"
    );
  });

  /**
   * Tests to ensure the role was not found and then the text channel was not found.
   */
  it("returns null when the role and channel is not found", async () => {
    jest
      .spyOn(memberMock.guild.roles.cache, "get")
      .mockImplementationOnce((): any => undefined);
    jest
      .spyOn(memberMock.guild.channels.cache, "get")
      .mockImplementationOnce((): any => undefined);

    await guildMemberAddHandler(memberMock);
    expect(memberMock.guild.roles.cache.get).toHaveBeenCalledTimes(1);
    expect(memberMock.roles.add).toHaveBeenCalledTimes(0);
    expect(memberMock.guild.channels.cache.get).toHaveBeenCalledTimes(1);
    expect(textChannelMock.send).not.toHaveBeenCalled();
  });

  /**
   * Tests to ensure the role is found and is added
   */
  it("should add the role when it is found", async () => {
    jest
      .spyOn(memberMock.guild.roles.cache, "get")
      .mockReturnValueOnce(roleMock);

    await guildMemberAddHandler(memberMock);
    expect(memberMock.roles.add).toHaveBeenCalledTimes(1);
    expect(memberMock.roles.add).toHaveBeenCalledWith(roleMock);
  });
});
