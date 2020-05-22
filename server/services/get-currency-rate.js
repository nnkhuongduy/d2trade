require('dotenv').config();
const SiteConfigs = require('../models/site-configs-model')

const getCurrencyRate = () => {
  return new Promise((resolve, reject) => {
    SiteConfigs.findOne({ name: "currencyRate" }, (err, result) => {
      if (!err) resolve(result.get('value'))
      else reject(err)
    })
  })
}

module.exports = getCurrencyRate