/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\routes\user.routes.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:02:05 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const express = require('express');
const router = express.Router();
const db = require('../config/sqlite.db');

/**
 * @name ensureAuthenticated
 * @description
 * This function checks if the user is authenticated.
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

/**
 * @name /user/info
 * @method GET
 * @description
 * This route is used to get the user information.
 * It returns the user's Discord ID, username, email, avatar, and guilds.
 * @returns {Object} - The user object
 */
router.get('/user/info', ensureAuthenticated, async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: "User not found" });
    }

    const userId = req.user.id;
    const allGuildsSql = `
        SELECT guilds.* FROM guilds
        JOIN user_guilds ON guilds.id = user_guilds.guildId
        WHERE user_guilds.userId = ?`;

    try {
        db.all(allGuildsSql, [userId], async (err, allGuilds) => {
            if (err) {
                console.error('Error fetching guilds:', err);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            // Map all guilds to include the necessary information
            const formattedAllGuilds = allGuilds.map(guild => ({
                id: guild.id,
                guildId: guild.guildId,
                guildName: guild.guildName,
                iconUrl: guild.icon ? `https://cdn.discordapp.com/icons/${guild.guildId}/${guild.icon}.png` : null,
                permissions: guild.permissions
            }));

            // Filter to get only admin guilds based on permissions
            const formattedAdminGuilds = formattedAllGuilds.filter(guild => guild.permissions === 2147483647);

            // Further filter for botAdminGuilds based on botIsMember setting
            const botAdminGuildPromises = formattedAdminGuilds.map(guild => new Promise(resolve => {
                console.log(guild.id)
                db.all(`SELECT settingKey, settingValue FROM guild_settings WHERE guildId = ?`, [guild.id], (err, settings) => {
                    if (err) {
                        console.error('Error fetching settings for guild:', guild.guildId, err);
                        return resolve(null); // Skip this guild if there's an error
                    }
                    const settingsMap = settings.reduce((acc, { settingKey, settingValue }) => {
                        acc[settingKey] = settingValue;
                        return acc;
                    }, {});
                    if (settingsMap.botIsMember === 'true') {
                        resolve(guild); // Include this guild if botIsMember is true
                    } else {
                        resolve(null); // Otherwise, exclude it
                    }
                });
            }));

            const botAdminGuilds = (await Promise.all(botAdminGuildPromises)).filter(Boolean);

            res.json({
                discordId: req.user.discordId,
                username: req.user.username,
                email: req.user.email,
                avatar: req.user.avatar,
                guilds: formattedAllGuilds,
                botAdminGuilds: botAdminGuilds
            });
        });
    } catch (error) {
        console.error('Error processing guilds:', error);
        return res.status(500).json({ message: "Error processing guilds" });
    }
});

module.exports = router;