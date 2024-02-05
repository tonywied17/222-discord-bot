const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const userRoutes = require('./routes/user.routes');

require('./config/passport.config');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: '222-super-secret-key-222',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(dashboardRoutes);
app.use(userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
