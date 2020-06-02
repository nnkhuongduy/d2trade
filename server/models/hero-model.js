const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const heroesSchema = new Schema({}, { strict: false })

const Heroes = mongoose.model("Heroes", heroesSchema, "Heroes");

module.exports = Heroes;