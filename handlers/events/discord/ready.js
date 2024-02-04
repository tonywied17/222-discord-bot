/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\handlers\events\discord\ready.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Saturday February 3rd 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat February 3rd 2024 11:54:07 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const {
	Events
} = require('discord.js');

/**
 * Client Ready Event
 * @type {import('discord.js').Event}
 */
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};