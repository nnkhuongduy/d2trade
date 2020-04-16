require('dotenv').config();
const SteamTotp = require('steam-totp');

const PORT = 5000;

const MONGODB = {
  MONGODB_URI: `mongodb+srv://${process.env.MONGODB_ADMIN_USERNAME}:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0-alnrp.mongodb.net/test?retryWrites=true&w=majority`
}

const STEAM_BOT = {
  accountName: process.env.STEAM_USER_NAME,
  password: process.env.STEAM_PASSWORD,
  twoFactorCode: SteamTotp.generateAuthCode(process.env.STEAM_SHARED_SECRET)
}

const STEAM_INFO = {
  STEAM_BOT_ID: process.env.BOT_STEAM_ID,
  APP_ID: 570,
  CONTEXT_ID: 2
}

const CONFIGS = {
  PORT,
  MONGODB,
  STEAM_BOT,
  STEAM_INFO
}

module.exports = CONFIGS;