/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\handlers\events\discord\guildCreate.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Tuesday February 6th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:11:04 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const axios = require('axios');
const { Events } = require('discord.js');

/**
 * Guild Create Event
 * @type {import('discord.js').Event}
 * @description This event is emitted when the bot joins a new guild.
 * It updates the settings for the guild in the backend.
 * @param {import('discord.js').Guild} guild
 * @returns {Promise<void>}
 */
module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log(`Joined a new guild: ${guild.name} (id: ${guild.id})`);

        const backendUrl = `${process.env.BACKEND_URL}/guilds/${guild.id}/settings`; 

        const defaultSettings = {
            botIsMember: 'true'
        };

        try {
            await axios.post(backendUrl, defaultSettings, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Default settings for ${guild.name} (id: ${guild.id}) updated successfully.`);
        } catch (error) {
            console.error(`Failed to post default settings for ${guild.name} (id: ${guild.id}):`, error);
        }
    }
};
