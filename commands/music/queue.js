const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the current music queue.'),
    async execute(interaction) {
        const queue = queues.get(interaction.guildId);

        if (!queue || queue.length === 0) {
            await interaction.reply({ content: "There's no music in the queue.", ephemeral: true });
            return;
        }

        const queueEmbed = new EmbedBuilder()
            .setTitle('Music Queue')
            .setColor(0x0099FF)
            .setDescription(queue.map((song, index) => `${index + 1}. [${song.title}](${song.url})`).join('\n'))
            .setFooter({ text: `Currently ${queue.length} song(s) in the queue.` });

        if (queueEmbed.data.description.length >= 4096) {
            queueEmbed.data.description = queueEmbed.data.description.substring(0, 4093) + '...';
        }

        await interaction.reply({ embeds: [queueEmbed] });
    },
};
