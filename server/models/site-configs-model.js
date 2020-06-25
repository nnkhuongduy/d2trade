const mongoose = require('../configs/mongoose-setup');
const Schema = mongoose.Schema;

const siteConfigSchema = new Schema({
  name: { type: String, required: true },
  value: Object
})

const SiteConfigs = mongoose.model("SiteConfigs", siteConfigSchema, "SiteConfigs");

module.exports = SiteConfigs;