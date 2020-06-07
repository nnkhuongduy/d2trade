const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy;
const SteamUsers = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await SteamUsers.findById(id).populate({
    path: 'offers',
    match: { offer_id: { $ne: "UNSET" } },
    options: { sort: { date: -1 } }
  })

  if (user) done(null, user)
  else done(new Error("Failed to deserialize an user"))
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
      avatar: profile._json.avatarfull,
      accountBalance: 0,
      tradeOfferUrl: "",
      receipts: [],
      offers: [],
    }).save();

    if (newUser) done(null, newUser);
  } else {
    done(null, currentUser);
  }
}))