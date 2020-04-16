const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const heroesSchema = new Schema({}, { strict: false })

const Heroes = mongoose.model("Hero", heroesSchema, "Hero");

module.exports = Heroes;