/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\commands\therapy\insult.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:55:10 
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
 * Roast Me Command
 * @type {import('discord.js').SlashCommand}
 * @description Roast someone with a randomly generated insult.
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("roastme")
        .setDescription("Roast someone with a randomly generated insult."),
    async execute(interaction) {
        const apiUrl =
            "https://evilinsult.com/generate_insult.php?lang=en&type=json";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();

            const replyContent = `${interaction.user.toString()}, ${data.insult}`;

            await interaction.reply(replyContent);
        } catch (error) {
            console.error("Error fetching insult:", error);
            await interaction.reply(
                "Failed to fetch an insult. Please try again later."
            );
        }
    },
};