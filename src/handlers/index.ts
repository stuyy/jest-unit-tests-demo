import { GuildMember, Message, TextChannel } from "discord.js";

/**
 * Simple message event handler that checks if a message was sent by a bot.
 * It also checks two simple commands and sends a default message
 * if neither conditions were met.
 * @param message Message
 */
export const messageHandler = async (message: Message) => {
  if (message.author.bot) {
    throw "Message sent by a bot.";
  }
  if (message.content === "!hello") {
    message.channel.send("Hello, World!");
  } else if (message.content === "!help") {
    message.channel.send("Help Command");
  } else {
    message.channel.send("Command not found.");
  }
};

/**
 * This handler searches for a Role, if it is found it will add it to the new GuildMember.
 * If it is not found, it will throw an error and find a Channel to send
 * the log message to. If it is not found it returns null.
 *
 * @param member The GuildMember that joined the Guild
 */
export const guildMemberAddHandler = async (member: GuildMember) => {
  try {
    const role = member.guild.roles.cache.get("some role id");
    if (!role) throw "Role not found.";
    member.roles.add(role);
  } catch (err) {
    const channel = <TextChannel>(
      member.guild.channels.cache.get("some channel id")
    );
    if (!channel) return null;
    channel.send("Role was not added to the member because it was not found");
  }
};
