/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\therapy\advice.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:55:39 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    SlashCommandBuilder
} = require('@discordjs/builders');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

/**
 * Advice Command
 * @type {import('discord.js').SlashCommand}
 * @description Get a random piece of advice!
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('Get a random piece of advice!'),
    async execute(interaction) {
        const apiUrl = 'https://api.adviceslip.com/advice';
        try {
            const response = await fetch(apiUrl);
            const {
                slip
            } = await response.json();
            await interaction.reply(`${interaction.user.toString()}, ${slip.advice}`);
        } catch (error) {
            console.error('Error fetching advice:', error);
            await interaction.reply('Failed to fetch advice. Please try again later.');
        }
    },
};