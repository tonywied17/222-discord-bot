/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\config\sqlite.db.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 3:57:13 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, '../database/_discord.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database at', dbPath);
  }
});

/**
 * @name initDb
 * @description
 * This function initializes the database and creates the tables if they don't exist.
 */
const initDb = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discordId TEXT UNIQUE,
      username TEXT,
      email TEXT,
      avatar TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS guilds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guildId TEXT UNIQUE,
      guildName TEXT,
      icon TEXT,
      permissions INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS user_guilds (
      userId INTEGER,
      guildId TEXT UNIQUE,
      permissions INTEGER,
      FOREIGN KEY (userId) REFERENCES user(id),
      FOREIGN KEY (guildId) REFERENCES guilds(id),
      UNIQUE(userId, guildId)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS guild_settings (
      guildId TEXT,
      settingKey TEXT,
      settingValue TEXT,
      FOREIGN KEY (guildId) REFERENCES guilds(id),
      UNIQUE(guildId, settingKey)
    )`);
  });
};

initDb();

module.exports = db;