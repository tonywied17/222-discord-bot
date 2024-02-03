const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

require('dotenv').config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

async function maybeSendRandomImage(interaction) {
  if (Math.random() < 0.22) {
    try {
      const response = await fetch('https://api.waifu.pics/sfw/waifu');
      if (!response.ok) {
        throw new Error('Failed to fetch from waifu.pics');
      }
      const data = await response.json();
      const randomImage = data.url;
      await interaction.followUp({ content: '# You won the 22% chance to get a waifu pic!', files: [randomImage] });
    } catch (error) {
      console.error('Failed to fetch NSFW waifu image:', error);
      await interaction.followUp({ content: 'Oops! Something went wrong while trying to fetch an image.', ephemeral: true });
    }
  }
}

const rest = new REST().setToken(token);
(async () => {
  try {
    console.log(`Started refreshing application (/) commands.`);
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
    await maybeSendRandomImage(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);
