const passport = require('passport')
const bcrypt = require('bcrypt')
const SteamStrategy = require('passport-steam').Strategy;
const SteamUsers = require('../models/user-model')
const LocalStrategy = require('passport-local').Strategy;
const SiteConfigs = require('../models/site-configs-model')

passport.serializeUser((user, done) => {
  if (user.id)
    done(null, user.id);
  else done(null, user)
});

passport.deserializeUser(async (id, done) => {
  if (typeof id === 'string' || id instanceof String) {
    const user = await SteamUsers.findById(id).populate({
      path: 'offers',
      match: { offer_id: { $ne: "UNSET" } },
      options: { sort: { date: -1 } }
    })

    if (user) done(null, user)
    else done(new Error("Failed to deserialize an user"))
  } else done(null, id);
});

passport.use('steam', new SteamStrategy({
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

passport.use(new LocalStrategy({
  usernameField: 'adminName',
  passwordField: 'password',
}, async (adminName, password, done) => {
  const admin = await SiteConfigs.findOne({ name: 'admin' }).lean();

  if (!admin) return done(null, false)

  if (adminName === admin.value.adminName && await bcrypt.compare(password, admin.value.password))
    done(null, { adminName: adminName, password: password })
  else done(null, false);
}))

module.exports = passport