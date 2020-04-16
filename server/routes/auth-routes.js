const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOMEPAGE_URL = 'http://localhost:3000';

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOMEPAGE_URL);
});

router.get('/steam', passport.authenticate('steam'));

router.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/auth/login/failed', successRedirect: CLIENT_HOMEPAGE_URL }));

module.exports = router;