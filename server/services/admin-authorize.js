const bcrypt = require('bcrypt')
const SiteConfigs = require('../models/site-configs-model')

const adminAuthorize = (admin) => new Promise(async (resolve, reject) => {
  if (!admin) return reject();
  const eAdmin = await SiteConfigs.findOne({ name: 'admin' }).lean();

  if (admin.adminName === eAdmin.value.adminName && await bcrypt.compare(admin.password, eAdmin.value.password))
    resolve()
  else reject();
})

module.exports = adminAuthorize