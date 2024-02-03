const { SlashCommandBuilder } = require('@discordjs/builders');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('affirmation')
        .setDescription('Get a motivational affirmation!'),
    async execute(interaction) {
        const apiUrl = 'https://www.affirmations.dev/';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();

            await interaction.reply(`${interaction.user.toString()}, ${data.affirmation}`);
        } catch (error) {
            console.error('Error fetching affirmation:', error);
            await interaction.reply('Failed to fetch an affirmation. Please try again later.');
        }
    },
};
