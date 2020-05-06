const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const siteSettingSchema = new Schema({
  name: { type: String, required: true }
}, { strict: false })

const SiteSettings = mongoose.model("SiteSettings", siteSettingSchema, "SiteSettings");

module.exports = SiteSettings;