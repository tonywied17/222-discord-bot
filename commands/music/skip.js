const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the currently playing song.'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guildId);
        if (!connection) {
            await interaction.reply({ content: "I'm not connected to a voice channel.", ephemeral: true });
            return;
        }

        const queue = queues.get(interaction.guildId);
        if (!queue || queue.length === 0) {
            await interaction.reply({ content: "There's no song in the queue to skip.", ephemeral: true });
            return;
        }

        const player = connection.state.subscription.player;
        player.stop();

        await interaction.reply('Skipped the currently playing song.');
    },
};
