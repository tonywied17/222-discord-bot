/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\routes\dashboard.routes.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:01:03 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const express = require('express');
const router = express.Router();

/**
 * @name /dashboard
 * @method GET
 * @description
 * This route is used to check if the user is authenticated.
 */
router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome ${req.user.username}!`);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
