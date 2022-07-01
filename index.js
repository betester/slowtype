require("dotenv").config();
const { Client, Intents } = require("discord.js");
const token = process.env.DISCORD_TOKEN;

console.log(token, "index js");
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
console.log("asdad");
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply("User info.");
  }
});
// Login to Discord with your client's token
client.login(token);
