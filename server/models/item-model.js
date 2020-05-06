const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: String,
  item_id: String,
  icon_url: String,
  rarity: String,
  rarity_color: String,
  used_by: String,
  price: {
    usd: Number,
    vnd: Number
  }
})

const Items = mongoose.model("Items", itemsSchema, "Items");

module.exports = Items;