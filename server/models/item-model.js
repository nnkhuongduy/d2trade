const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: String,
  nameColor: String,
  icon_url: String,
  hero: String,
  rarity: String,
  prices: {
    usd: Number,
    vnd: Number
  },
  configs: {
    isNonMarket: false,
    isInscribed: false,
    isDisabled: false
  }
})

const Items = mongoose.model("Items", itemsSchema, "Items");

module.exports = Items;