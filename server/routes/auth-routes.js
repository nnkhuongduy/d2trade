const authRouter = require('express').Router();
const passport = require('passport');
const CLIENT_HOMEPAGE_URL = 'http://localhost:3000';

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else res.sendStatus(404)
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOMEPAGE_URL);
});

authRouter.get('/steam', passport.authenticate('steam'));

authRouter.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/auth/login/failed', successRedirect: CLIENT_HOMEPAGE_URL }));

module.exports = authRouter;