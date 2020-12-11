import { config } from "dotenv";
import { Client } from "discord.js";
import { messageHandler, guildMemberAddHandler } from "./handlers";

config();

const client = new Client();
client.on("ready", () => {
  if (client.user) {
    console.log(`${client.user.tag} has logged in.`);
  }
});

client.on("message", messageHandler);
client.on("guildMemberAdd", guildMemberAddHandler);

client.login(process.env.BOT_TOKEN);
