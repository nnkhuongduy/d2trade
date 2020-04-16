const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy;
const SteamUsers = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  SteamUsers.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:5000/auth/steam/return',
  realm: 'http://localhost:5000/',
  apiKey: process.env.STEAM_API_KEY
}, async (indentifier, profile, done) => {
  const currentUser = await SteamUsers.findOne({ steamid: profile._json.steamid });

  if (!currentUser) {
    const newUser = await new SteamUsers({
      steamid: profile._json.steamid,
      personaname: profile._json.personaname,
      profileurl: profile._json.profileurl,
      avatar: profile._json.avatar,
      accountBalance: 0,
      tradeOfferUrl: "",
    }).save();

    if (newUser) done(null, newUser);
  } else {
    done(null, currentUser);
  }
}))