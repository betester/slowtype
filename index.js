require("dotenv").config();
const { Client, Intents } = require("discord.js");
const WOKCommands = require("wokcommands");
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
const path = require("path");
// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)

client.once("ready", () => {
  //   console.log("Ready!");
  new WOKCommands(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, "commands"),
    // What guilds your slash commands will be created in
    testServers: [guildId],
  });
});

// Login to Discord with your client's token
client.login(token);
