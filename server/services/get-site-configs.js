const SiteConfigs = require('../models/site-configs-model')

const getSiteConfigs = () => {
  return new Promise((resolve, reject) => {
    SiteConfigs.find({}, (err, configs) => {
      if (!err) resolve(configs)
      else reject(err)
    })
  })
}

module.exports = getSiteConfigs