/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\music\queue.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:57:07 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

/**
 * Queue Command
 * @type {import('discord.js').SlashCommand}
 * @description Displays the current music queue.
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the current music queue.'),
    async execute(interaction) {
        const queue = queues.get(interaction.guildId);

        if (!queue || queue.length === 0) {
            await interaction.reply({
                content: "There's no music in the queue.",
                ephemeral: true
            });
            return;
        }

        const queueEmbed = new EmbedBuilder()
            .setTitle('Music Queue')
            .setColor(0x0099FF)
            .setDescription(queue.map((song, index) => `${index + 1}. [${song.title}](${song.url})`).join('\n'))
            .setFooter({
                text: `Currently ${queue.length} song(s) in the queue.`
            });

        if (queueEmbed.data.description.length >= 4096) {
            queueEmbed.data.description = queueEmbed.data.description.substring(0, 4093) + '...';
        }

        await interaction.reply({
            embeds: [queueEmbed]
        });
    },
};