const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session')
const cookieParser = require("cookie-parser");
const passport = require('../configs/passport-setup');

const authRoutes = require('../routes/auth-routes')
const adminRoutes = require('../routes/admin-routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);
app.use(session({
  name: "d2trade sessions",
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 100
}))
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

module.exports = app;