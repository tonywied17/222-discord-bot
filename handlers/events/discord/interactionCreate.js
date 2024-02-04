const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
			await maybeSendRandomImage(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
	
};

async function maybeSendRandomImage(interaction) {
	if (Math.random() < 0.22) {
	  try {
		const response = await fetch('https://api.waifu.pics/sfw/waifu');
		if (!response.ok) {
		  throw new Error('Failed to fetch from waifu.pics');
		}
		const data = await response.json();
		const randomImage = data.url;
		await interaction.followUp({ content: '# You won the 22% chance to get a waifu pic!', files: [randomImage] });
	  } catch (error) {
		console.error('Failed to fetch NSFW waifu image:', error);
		await interaction.followUp({ content: 'Oops! Something went wrong while trying to fetch an image.', ephemeral: true });
	  }
	}
  }