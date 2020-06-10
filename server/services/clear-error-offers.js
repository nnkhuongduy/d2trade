const SteamOffers = require('../models/offer-model')

const clearErrorOffers = () => new Promise((resolve, reject) => {
  SteamOffers.deleteMany({ offer_id: 'UNSET' }, (err) => {
    if (!err) resolve()
    else reject(err)
  })
})

module.exports = clearErrorOffers