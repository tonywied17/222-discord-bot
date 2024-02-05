const express = require('express');
const router = express.Router();
const db = require('../config/sqlite.db');

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

router.get('/user/info', ensureAuthenticated, (req, res) => {
    if (req.user) {
        const userId = req.user.id;

        db.all(`SELECT guilds.* FROM guilds
                JOIN user_guilds ON guilds.id = user_guilds.guildId
                WHERE user_guilds.userId = ?`, [userId], (err, guilds) => {
            if (err) {
                res.status(500).json({ message: "Internal Server Error" });
            } else {
                const formattedGuilds = guilds.map(guild => ({
                    id: guild.id,
                    guildId: guild.guildId,
                    guildName: guild.guildName,
                    iconUrl: guild.icon ? `https://cdn.discordapp.com/icons/${guild.guildId}/${guild.icon}.png` : null,
                    permissions: guild.permissions
                }));

                res.json({
                    discordId: req.user.id,
                    username: req.user.username,
                    email: req.user.email,
                    avatar: req.user.avatar,
                    guilds: formattedGuilds 
                });
            }
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});


module.exports = router;
