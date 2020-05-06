require('dotenv').config();
const SiteSettings = require('../models/site-settings-model')

const getCurrencyRate = () => {
  return new Promise((resolve, reject) => {
    SiteSettings.findOne({ name: "currencyRate" }, (err, result) => {
      if (!err) resolve(result.get('value'))
      else reject(err)
    })
  })
}

module.exports = getCurrencyRate