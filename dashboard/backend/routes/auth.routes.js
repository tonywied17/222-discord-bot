const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/discord', passport.authenticate('discord'));

router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
  }), (req, res) => {
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000/dashboard");
  });

router.get('/auth/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.clearCookie('connect.sid'); 
      res.redirect('/');
    });
});

router.get('/auth/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;
