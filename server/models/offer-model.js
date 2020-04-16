const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const steamOffersSchema = new Schema({
  offer_id: String,
  steam_id: String,
  date: { type: Date, default: Date.now, expires: 24 * 60 * 60 },
  bot_items: [{
    id: String,
    image_url: String
  }],
  user_items: [{
    id: String,
    image_url: String
  }],
  status: String,
})

const SteamOffers = mongoose.model("SteamOffers", steamOffersSchema, "SteamOffers");

module.exports = SteamOffers;