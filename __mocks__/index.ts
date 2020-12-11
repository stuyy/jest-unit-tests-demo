import { GuildMember, Role, TextChannel } from "discord.js";

// Guild Member Mock
export const getGuildMemberMock = () =>
  (({
    roles: {
      add: jest.fn(),
      cache: {
        get: jest.fn(),
      },
    },
    guild: {
      roles: {
        cache: {
          get: jest.fn(),
        },
      },
      channels: {
        cache: {
          get: jest.fn(),
        },
      },
    },
  } as unknown) as GuildMember);

// Text Channel Mock
export const getTextChannelMock = () =>
  (({
    send: jest.fn(),
  } as unknown) as TextChannel);

// Role Mock
export const getRoleMock = () =>
  (({
    id: "",
  } as unknown) as Role);
