const express = require("express");
const router = express.Router();
const db = require("../config/sqlite.db");

router.get("/bot", (req, res) => {
  res.send(`Bot route is working!`);
});

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
