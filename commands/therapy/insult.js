const { SlashCommandBuilder } = require('@discordjs/builders');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roastme')
        .setDescription('Roast someone with a randomly generated insult.'),
    async execute(interaction) {
        const apiUrl = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();

            const replyContent = `${interaction.user.toString()}, ${data.insult}`;

            await interaction.reply(replyContent);
        } catch (error) {
            console.error('Error fetching insult:', error);
            await interaction.reply('Failed to fetch an insult. Please try again later.');
        }
    },
};
