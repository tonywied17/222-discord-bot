/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\routes\bot.routes.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Tuesday February 6th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:00:44 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const express = require("express");
const router = express.Router();
const db = require("../config/sqlite.db");

/**
 * @name /guilds/:guildId/settings
 * @method POST
 * @description
 * This route is used to update the settings for a specific guild.
 * It takes the guildId as a parameter and the settings as the request body.
 * It updates the settings in the database and returns a success message.
 * @returns {Object} - The success message
 */
router.post("/guilds/:guildId/settings", async (req, res) => {
  const guildId = req.params.guildId;
  console.log(guildId);
  const settings = req.body;

  try {
    for (const [key, value] of Object.entries(settings)) {
      const sql = `INSERT INTO guild_settings (guildId, settingKey, settingValue)
                         VALUES ((SELECT id FROM guilds WHERE guildId = ?), ?, ?)
                         ON CONFLICT(guildId, settingKey) DO UPDATE SET settingValue = excluded.settingValue`;
      await db.run(sql, [guildId, key, value]);
    }
    res.json({ message: "Settings updated successfully" });
  } catch (err) {
    console.error("Error updating guild settings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @name /guilds/:guildId/settings
 * @method GET
 * @description
 * This route is used to get the settings for a specific guild.
 * It takes the guildId as a parameter and returns the settings for that guild.
 * @returns {Object} - The settings object
 */
router.get("/guilds/:guildId/settings", (req, res) => {
  const { guildId } = req.params;
  const sql = `SELECT settingKey, settingValue FROM guild_settings
                 WHERE guildId = (SELECT id FROM guilds WHERE guildId = ?)`;

  db.all(sql, [guildId], (err, rows) => {
    if (err) {
      console.error("Error fetching guild settings:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const settings = {};
    rows.forEach((row) => {
      settings[row.settingKey] = row.settingValue;
    });
    res.json(settings);
  });
});

module.exports = router;
