const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: String,
  personaname: String,
  profileurl: String,
  avatar: String,
  accountBalance: Number,
  tradeOfferUrl: String,
})

const SteamUsers = mongoose.model("SteamUsers", userSchema, "SteamUsers");

module.exports = SteamUsers;