require('dotenv').config();
const SiteSettings = require('../models/site-settings-model')

const getCurrencyRate = () => {
  return new Promise((resolve, reject) => {
    SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, result) => {
      if (!err) resolve(result)
      else reject(err)
    })
  })
}

module.exports = getCurrencyRate