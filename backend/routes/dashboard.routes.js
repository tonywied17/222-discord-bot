const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome ${req.user.username}!`);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
