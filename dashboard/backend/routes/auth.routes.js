/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\routes\auth.routes.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:00:42 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @name /auth/discord
 * @method GET
 * @description
 * This route is used to authenticate the user with Discord.
 * It redirects the user to the Discord OAuth page.
 */
router.get('/auth/discord', passport.authenticate('discord'));

/**
 * @name /auth/discord/callback
 * @method GET
 * @description
 * This route is used to handle the callback from Discord.
 * The passport.authenticate middleware is used to authenticate the user with the Discord strategy.
 * If the authentication fails, the user is redirected to the homepage.
 * If the authentication is successful, the user is redirected to the dashboard.
 * @returns {Object} - The user object
 */
router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
  }), (req, res) => {
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000/dashboard");
  });

/**
 * @name /auth/logout
 * @method GET
 * @description
 * This route is used to log the user out.
 * It clears the session and redirects the user to the homepage.
 */
router.get('/auth/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.clearCookie('connect.sid'); 
      res.redirect('/');
    });
});

/**
 * @name /auth/checkAuth
 * @method GET
 * @description
 * This route is used to check if the user is authenticated.
 * It returns a JSON object with the isAuthenticated property set to true or false.
 * @returns {Object} - The isAuthenticated property
 */
router.get('/auth/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;
