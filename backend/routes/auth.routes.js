const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/discord', passport.authenticate('discord'));

router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(`${frontendURL}/dashboard?auth=success`);
});


module.exports = router;
