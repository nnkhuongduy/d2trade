const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const steamOffersSchema = new Schema({
  offer_id: String,
  steam_id: String,
  date: { type: Date, default: Date.now, expires: 3 * 30 * 24 * 60 * 60 },
  bot_items: [{
    id: String,
    icon_url: String,
    market_price: String,
    vnd_price: String
  }],
  user_items: [{
    id: String,
    icon_url: String,
    market_price: String,
    vnd_price: String
  }],
  status: String,
})

const SteamOffers = mongoose.model("SteamOffers", steamOffersSchema, "SteamOffers");

module.exports = SteamOffers;