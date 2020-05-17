const SteamOffers = require('../models/offer-model')

const getOffers = () => {
  return new Promise((resolve, reject) => {
    SteamOffers.find((err, offers) => {
      if (!err) resolve(offers)
      else reject(err)
    })
  })
}

module.exports = getOffers