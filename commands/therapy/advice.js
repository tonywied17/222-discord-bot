const { SlashCommandBuilder } = require('@discordjs/builders');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('Get a random piece of advice!'),
    async execute(interaction) {
        const apiUrl = 'https://api.adviceslip.com/advice';
        try {
            const response = await fetch(apiUrl);
            const { slip } = await response.json();
            await interaction.reply(`${interaction.user.toString()}, ${slip.advice}`);
        } catch (error) {
            console.error('Error fetching advice:', error);
            await interaction.reply('Failed to fetch advice. Please try again later.');
        }
    },
};
