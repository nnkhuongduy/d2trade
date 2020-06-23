const SiteConfigs = require('../models/site-configs-model')
const bcrypt = require('bcrypt');
const CONFIGS = require('../configs/configs')

const adminNewPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, CONFIGS.SALT_ROUNDS)
    .then(hash => {
      SiteConfigs.findOneAndUpdate({ name: 'adminPassword' }, { value: hash }, (err, config) => {
        if (!err) resolve(config)
        else reject(err)
      })
    })
    .catch(err => reject(err))
})

module.exports = adminNewPassword