import { Message } from "discord.js";
import { messageHandler } from "../src/handlers";

describe("Message Handler", () => {
  const message = ({
    channel: {
      send: jest.fn(),
    },
    content: "",
    author: {
      bot: false,
    },
  } as unknown) as Message;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it should send Hello, World!", async () => {
    message.content = "!hello";
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith("Hello, World!");
    expect(message.channel.send).not.toHaveBeenCalledWith("Help Command");
  });

  it("should send Help Command", async () => {
    message.content = "!help";
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledTimes(1);
    expect(message.channel.send).toHaveBeenCalledWith("Help Command");
  });

  it("should throw an error when a bot sends a message", async () => {
    message.author.bot = true;
    try {
      await messageHandler(message);
    } catch (err) {
      expect(err).toBeDefined();
      expect(message.channel.send).not.toHaveBeenCalled();
    }
  });
  it("should not call any channel.send()", async () => {
    message.author.bot = false;
    message.content = "!random";
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith("Command not found.");
    expect(message.channel.send).toHaveBeenCalledTimes(1);
  });
});
