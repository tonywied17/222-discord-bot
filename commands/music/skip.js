/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\music\skip.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:56:45 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    SlashCommandBuilder
} = require('discord.js');
const {
    getVoiceConnection
} = require('@discordjs/voice');

/**
 * Skip Command
 * @type {import('discord.js').SlashCommand}
 * @description Skips the currently playing song.
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the currently playing song.'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guildId);
        if (!connection) {
            await interaction.reply({
                content: "I'm not connected to a voice channel.",
                ephemeral: true
            });
            return;
        }

        const queue = queues.get(interaction.guildId);
        if (!queue || queue.length === 0) {
            await interaction.reply({
                content: "There's no song in the queue to skip.",
                ephemeral: true
            });
            return;
        }

        const player = connection.state.subscription.player;
        player.stop();

        await interaction.reply('Skipped the currently playing song.');
    },
};