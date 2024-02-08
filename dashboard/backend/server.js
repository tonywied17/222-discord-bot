/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\backend\server.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:04:31 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const userRoutes = require('./routes/user.routes');
const botRoutes = require('./routes/bot.routes');
require('dotenv').config();
require('./config/passport.config');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

/**
 * Session configuration
 * The session is stored in memory by default. For production, use a more secure store.
 */
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

/**
 * Passport middleware
 * This middleware is used to authenticate the user.
 * It also sets up the session.
 * The session is used to keep the user logged in.
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(userRoutes);
app.use(botRoutes);

/**
 * Root route
 */
app.get('/', (req, res) => {
  res.send('Hello, World! 222 Up and Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
