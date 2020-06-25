const SiteConfigs = require('../models/site-configs-model')

const adminUpdate = (info) => new Promise(async (resolve, reject) => {
  try {
    const admin = await SiteConfigs.findOne({ name: 'admin' });

    Object.keys(info).forEach(key => {
      if (admin.value[key]) admin.value[key] = info[key]
      else new Error('Wrong info!')
    })

    admin.markModified('value')
    await admin.save();

    resolve(admin)
  } catch (err) { reject(err) }
})

module.exports = adminUpdate