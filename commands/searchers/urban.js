/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\searchers\urban.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:57:59 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    EmbedBuilder
} = require('discord.js');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

/**
 * Urban Dictionary Command
 * @type {import('discord.js').SlashCommand}
 * @description Get the definition of a word from Urban Dictionary.
 * @options {string} word - The word to define
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Get the definition of a word from Urban Dictionary.')
        .addStringOption(option =>
            option.setName('word')
            .setDescription('The word to define')
            .setRequired(true)),
    async execute(interaction) {
        const word = interaction.options.getString('word');
        const apiUrl = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`;
        try {
            const response = await fetch(apiUrl);
            const {
                list
            } = await response.json();
            if (!list.length) {
                await interaction.reply({
                    content: 'No definitions found for this word.',
                    ephemeral: true
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setColor(0xEFFF00)
                .setTitle(`"${word}"`)
                .setDescription(list[0].definition.replace(/\[|\]/g, '').substring(0, 4096))
                .addFields({
                    name: 'Example',
                    value: list[0].example.replace(/\[|\]/g, '').substring(0, 1024) || 'No example provided.'
                })
                .setFooter({
                    text: 'Urban Dictionary'
                });

            await interaction.reply({
                embeds: [embed]
            });
        } catch (error) {
            console.error('Error fetching definition:', error);
            await interaction.reply({
                content: 'Failed to fetch the definition. Please try again later.',
                ephemeral: true
            });
        }
    },
};