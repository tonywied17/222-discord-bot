/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\therapy\affirmations.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:55:24 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
    SlashCommandBuilder
} = require("@discordjs/builders");
let fetch;
import("node-fetch").then((module) => {
    fetch = module.default;
});

/**
 * Affirmation Command
 * @type {import('discord.js').SlashCommand}
 * @description Get a motivational affirmation!
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("affirmation")
        .setDescription("Get a motivational affirmation!"),
    async execute(interaction) {
        const apiUrl = "https://www.affirmations.dev/";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();

            await interaction.reply(
                `${interaction.user.toString()}, ${data.affirmation}`
            );
        } catch (error) {
            console.error("Error fetching affirmation:", error);
            await interaction.reply(
                "Failed to fetch an affirmation. Please try again later."
            );
        }
    },
};