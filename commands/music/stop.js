const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music and leaves the voice channel!'),
    async execute(interaction) {
        const voiceConnection = getVoiceConnection(interaction.guildId);

        if (!voiceConnection) {
            await interaction.reply({ content: 'I am not currently playing music in any channel!', ephemeral: true });
            return;
        }

        // Stop the audio player and disconnect from the voice channel
        voiceConnection.destroy();

        await interaction.reply({ content: 'Stopped the music and left the voice channel!' });
    },
};
