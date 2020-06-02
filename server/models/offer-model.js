const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const steamOffersSchema = new Schema({
  offer_id: String,
  steam_id: String,
  date: { type: Date, default: Date.now, expires: 3 * 30 * 24 * 60 * 60 },
  user_balance: Number,
  bot_items: [{
    assetId: String,
    hero: String,
    iconUrl: String,
    name: String,
    prices: {
      usd: Number,
      vnd: Number
    },
    rarity: String
  }],
  user_items: [{
    assetId: String,
    hero: String,
    iconUrl: String,
    name: String,
    prices: {
      usd: Number,
      vnd: Number
    },
    rarity: String
  }],
  status: String,
})

const SteamOffers = mongoose.model("SteamOffers", steamOffersSchema, "SteamOffers");

module.exports = SteamOffers;