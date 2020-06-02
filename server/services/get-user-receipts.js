const SteamUsers = require('../models/user-model')

const getReceipts = steamId => new Promise((resolve, reject) => {
  SteamUsers.findOne({ steamid: steamId }).populate('receipts').exec((err, receipts) => {
    if (!err) resolve(receipts)
    else reject(err)
  })
})

module.exports = getReceipts