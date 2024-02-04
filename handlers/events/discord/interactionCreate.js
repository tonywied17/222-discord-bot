/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\handlers\events\discord\interactionCreate.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:53:40 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
	Events
} = require('discord.js');

/**
 * Interaction Create Event
 * @type {import('discord.js').Event}
 * @description This event is emitted when a user uses a slash command.
 * Each command use has a 22% chance to send a waifu pic.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
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
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					ephemeral: true
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true
				});
			}
		}
	},

};

/**
 * Randomly sends a waifu image with a 22% chance.
 * @param {*} interaction
 */
async function maybeSendRandomImage(interaction) {
	if (Math.random() < 0.22) {
		try {
			const response = await fetch('https://api.waifu.pics/sfw/waifu');
			if (!response.ok) {
				throw new Error('Failed to fetch from waifu.pics');
			}
			const data = await response.json();
			const randomImage = data.url;
			await interaction.followUp({
				content: '# You won the 22% chance to get a waifu pic!',
				files: [randomImage]
			});
		} catch (error) {
			console.error('Failed to fetch NSFW waifu image:', error);
			await interaction.followUp({
				content: 'Oops! Something went wrong while trying to fetch an image.',
				ephemeral: true
			});
		}
	}
}