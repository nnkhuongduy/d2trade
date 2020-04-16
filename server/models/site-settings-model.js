const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const siteSettingSchema = new Schema({
  currencyRate: Number
})

const SiteSettings = mongoose.model("SiteSettings", siteSettingSchema, "SiteSettings");

module.exports = SiteSettings;