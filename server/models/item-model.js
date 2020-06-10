const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: String,
  iconUrl: String,
  hero: String,
  rarity: String,
  prices: {
    usd: Number,
    vnd: Number
  },
  configs: {
    isNonMarket: false,
    isDisabled: false
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Items = mongoose.model("Items", itemsSchema, "Items");

module.exports = Items;