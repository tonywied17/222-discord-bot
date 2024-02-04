/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\slash-register.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:59:42 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    REST,
    Routes
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

/**
 * Client Commands
 * @type {Array<Object>}
 * @description The client commands are handled in the commands directory.
 * The command files are named after the command they handle and are in the format of:
 * command-name.js
 */
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

/**
 * Discord REST API
 */
const rest = new REST({
    version: '10'
}).setToken(token);

/**
 * Refresh Application (/) Commands
 * @description This script will delete all existing application (/) commands and then register the new commands.
 * @param {Array<Object>} commands
 */
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
            Routes.applicationCommands(clientId), {
                body: commands
            },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
    } catch (error) {
        console.error(error);
    }
})();