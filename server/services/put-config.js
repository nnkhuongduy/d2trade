const SiteConfigs = require('../models/site-configs-model')

const putConfig = config => new Promise((resolve, reject) => {
  SiteConfigs.findOneAndUpdate({ name: config.name }, { value: config.value }, (err) => {
    if (!err) resolve()
    else reject(err)
  })
})

module.exports = putConfig