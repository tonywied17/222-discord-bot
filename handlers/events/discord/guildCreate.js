const axios = require('axios');
const { Events } = require('discord.js');

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
