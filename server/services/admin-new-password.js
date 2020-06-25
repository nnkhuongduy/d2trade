const SiteConfigs = require('../models/site-configs-model')
const bcrypt = require('bcrypt');
const CONFIGS = require('../configs/configs')

const adminNewPassword = (password) => new Promise(async (resolve, reject) => {
  try {
    const hash = await bcrypt.hash(password, CONFIGS.SALT_ROUNDS)

    const admin = await SiteConfigs.findOne({ name: 'admin' })

    admin.value.password = hash;

    admin.markModified('value')
    await admin.save()

    resolve(admin)
  } catch (err) { reject(err) }
})

module.exports = adminNewPassword