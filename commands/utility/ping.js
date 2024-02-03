const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const startTime = Date.now();
		const botLatency = Date.now() - interaction.createdTimestamp;
		const apiLatency = interaction.client.ws.ping;
		const guildAvatar = interaction.guild.iconURL({ dynamic: true });

		// Embed that uses the EmbedBuilder class
		const embed1 = new EmbedBuilder()
          .setColor("#425678")
          .setTitle(`Pong!`)
          .setThumbnail(guildAvatar)
          .addFields(
			{ name: `Bot Latency`, value: `${botLatency} ms` },
			{ name: `API Latency`, value: `${apiLatency} ms` }
		)
          .setTimestamp(new Date())
		  .setFooter({ text: `Roundtrip Time: ${Date.now() - startTime}ms` })

		// Embed that uses the object literal syntax
		// const embed2 = {
		// 	color: parseInt("425678", 16),
		// 	title: "Pong!",
		// 	fields: [
		// 		{ name: "Bot Latency", value: botLatency + "ms" },
		// 		{ name: "API Latency", value: apiLatency + "ms" }
		// 	],
		// 	timestamp: new Date(),
		// 	footer: { text: `Roundtrip Time: ${Date.now() - startTime}ms` }
		// };

		await interaction.reply({ embeds: [embed1] });

	},
};