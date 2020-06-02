const SteamOffers = require('../models/offer-model')

const updateDBOffer = (dbId, updateObj) => new Promise((resolve, reject) => {
  SteamOffers.findOneAndUpdate({ _id: dbId }, updateObj, (err) => {
    if (!err)
      resolve();
    else reject(err)
  })
})

module.exports = updateDBOffer