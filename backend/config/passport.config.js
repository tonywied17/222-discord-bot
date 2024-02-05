const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const db = require("./sqlite.db");

passport.use(
  new DiscordStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["identify", "email", "guilds"],
    },
    function (accessToken, refreshToken, profile, done) {
      const avatarURL = profile.avatar ?
        `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` :
        null;
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
            const {
              lastID
            } = await dbRunAsync(
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

function dbRunAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

passport.serializeUser((user, done) => done(null, user.dbId));

passport.deserializeUser((id, done) => {
  db.get(`SELECT * FROM user WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return done(err, null);
    done(null, row);
  });
});