/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\music\stop.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:56:32 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");
const {
    getVoiceConnection
} = require("@discordjs/voice");

/**
 * Stop Command
 * @type {import('discord.js').SlashCommand}
 * @description Stops the music and leaves the voice channel!
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the music and leaves the voice channel!"),
    async execute(interaction) {
        const voiceConnection = getVoiceConnection(interaction.guildId);

        if (!voiceConnection) {
            await interaction.reply({
                content: "I am not currently playing music in any channel!",
                ephemeral: true,
            });
            return;
        }

        // Stop the audio player and disconnect from the voice channel
        voiceConnection.destroy();

        await interaction.reply({
            content: "Stopped the music and left the voice channel!",
        });
    },
};