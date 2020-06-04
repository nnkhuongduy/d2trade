const SteamOffers = require('../models/offer-model')

const getUserOffers = steamId => {
  return new Promise((resolve, reject) => {
    SteamOffers.find({ steam_id: steamId, offer_id: { $ne: "UNSET" } }).sort({ offer_id: -1 }).exec((err, offers) => {
      if (!err) resolve(offers)
      else reject(err)
    })
  })
}

module.exports = getUserOffers