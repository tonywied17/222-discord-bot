const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sync')
        .setDescription('Syncs the guild settings with the backend. You probably won\'t need to use this command.'),
    async execute(interaction) {
        const guildId = interaction.guild.id; 
        const backendUrl = `${process.env.BACKEND_URL}/guilds/${guildId}/settings`; 

        const settings = {
            botIsMember: 'true'
        };

        try {
            await axios.post(backendUrl, settings, { headers: { 'Content-Type': 'application/json' } });

            await interaction.reply({ content: `Guild settings synced successfully!\nPosted to: ${process.env.BACKEND_URL}/guilds/${guildId}/settings`, ephemeral: true });
        } catch (error) {
            console.error(`Failed to sync guild settings for ${interaction.guild.name}:`, error);

            await interaction.reply({ content: 'Failed to sync guild settings.', ephemeral: true });
        }
    }
};
