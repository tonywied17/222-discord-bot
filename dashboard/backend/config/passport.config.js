/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\config\passport.config.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 3:56:29 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const db = require("./sqlite.db");

/**
 * @name passport.use
 * @description
 * This function initializes the passport middleware and sets up the Discord strategy.
 * It also sets up the serialization and deserialization of the user.
 */
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["identify", "email", "guilds"],
    },
    function (accessToken, refreshToken, profile, done) {
      const avatarURL = profile.avatar
        ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
        : null;
      profile.avatarURL = avatarURL;

      db.get(
        `SELECT * FROM user WHERE discordId = ?`,
        [profile.id],
        function (err, row) {
          if (err) return done(err);

          if (!row) {
            db.run(
              `INSERT INTO user (discordId, username, email, avatar) VALUES (?, ?, ?, ?)`,
              [profile.id, profile.username, profile.email, avatarURL],
              function (err) {
                if (err) return done(err);

                profile.dbId = this.lastID;
                processGuilds(profile, profile.dbId, done);
              }
            );
          } else {
            db.run(
              `UPDATE user SET username = ?, email = ?, avatar = ? WHERE discordId = ?`,
              [profile.username, profile.email, avatarURL, profile.id],
              function (err) {
                if (err) return done(err);

                profile.dbId = row.id;
                processGuilds(profile, profile.dbId, done);
              }
            );
          }
        }
      );
    }
  )
);

/**
 * @name processGuilds
 * @description
 * This function processes the guilds of the user and inserts them into the database.
 * It also links the user to the guilds in the user_guilds table.
 * @param {*} profile - The user's profile
 * @param {*} userId - The ID of the user
 * @param {*} done - The done function from the passport strategy
 * @returns - A promise that resolves when all guilds have been processed
 */
async function processGuilds(profile, userId, done) {
  if (!profile.guilds || profile.guilds.length === 0)
    return done(null, profile);

  const guildPromises = profile.guilds.map((guild) =>
    processSingleGuild(guild, userId)
  );

  try {
    await Promise.all(guildPromises);
    done(null, profile);
  } catch (error) {
    console.error("Error processing guilds:", error);
    done(error, null);
  }
}

/**
 * @name processSingleGuild
 * @description
 * This function processes a single guild and inserts it into the database.
 * It also links the user to the guild in the user_guilds table.
 * @param {*} guild - The guild to process
 * @param {*} userId - The ID of the user
 * @returns - A promise that resolves when the guild has been processed
 */
async function processSingleGuild(guild, userId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id FROM guilds WHERE guildId = ?`,
      [guild.id],
      async (err, row) => {
        if (err) return reject(err);

        let guildDbId;
        if (!row) {
          try {
            const { lastID } = await dbRunAsync(
              `INSERT INTO guilds (guildId, guildName, icon, permissions) VALUES (?, ?, ?, ?)`,
              [guild.id, guild.name, guild.icon, guild.permissions]
            );
            guildDbId = lastID;
          } catch (insertError) {
            return reject(insertError);
          }
        } else {
          guildDbId = row.id;
        }

        try {
          await dbRunAsync(
            `INSERT OR IGNORE INTO user_guilds (userId, guildId) VALUES (?, ?)`,
            [userId, guildDbId]
          );
          resolve();
        } catch (linkError) {
          reject(linkError);
        }
      }
    );
  });
}

/**
 * @name dbRunAsync
 * @description
 * This function is a wrapper around the db.run function that returns a promise.
 * @param {*} sql - The SQL query to run
 * @param {*} params - The parameters to pass to the query
 * @returns 
 */
function dbRunAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

/**
 * @name passport.serializeUser
 * @description
 * This function serializes the user to the session.
 */
passport.serializeUser((user, done) => done(null, user.dbId));

/**
 * @name passport.deserializeUser
 * @description
 * This function deserializes the user from the session.
 */
passport.deserializeUser((id, done) => {
  db.get(`SELECT * FROM user WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return done(err, null);
    done(null, row);
  });
});
