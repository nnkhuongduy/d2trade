const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: String,
  personaname: String,
  profileurl: String,
  avatar: String,
  accountBalance: Number,
  tradeOfferUrl: String,
  createdDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  receipts: [{
    type: Schema.Types.ObjectId,
    ref: 'Receipts'
  }],
  offers: [{
    type: Schema.Types.ObjectId,
    ref: 'SteamOffers'
  }],
})

const SteamUsers = mongoose.model("SteamUsers", userSchema, "SteamUsers");

module.exports = SteamUsers;