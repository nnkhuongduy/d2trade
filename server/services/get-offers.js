const SteamOffers = require('../models/offer-model')

const getOffers = () => {
  return new Promise((resolve, reject) => {
    SteamOffers.find({}).sort({date: -1}).exec((err, offers) => {
      if (!err && offers) resolve(offers)
      else reject(err ? err : 'NO OFFERS')
    })
  })
}

module.exports = getOffers