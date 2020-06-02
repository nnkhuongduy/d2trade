const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'SteamUsers'
  },
  steamId: {
    required: true,
    type: Schema.Types.String
  },
  total: {
    required: true,
    type: Schema.Types.Number
  }
}, { timestamps: true })

const Receipts = mongoose.model("Receipts", receiptSchema, "Receipts");

module.exports = Receipts;