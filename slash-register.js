const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        // Fetch existing commands
        console.log('Fetching existing application (/) commands...');
        const existingCommands = await rest.get(Routes.applicationCommands(clientId));

        // Delete existing commands
        console.log(`Deleting ${existingCommands.length} existing application (/) commands...`);
        for (const command of existingCommands) {
            await rest.delete(Routes.applicationCommand(clientId, command.id));
        }
        console.log('Successfully deleted all existing application (/) commands.');

        // Register new commands
        console.log(`Started refreshing ${commands.length} application (/) commands globally.`);
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
    } catch (error) {
        console.error(error);
    }
})();
