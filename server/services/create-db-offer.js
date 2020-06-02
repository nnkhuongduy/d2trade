const SteamOffers = require('../models/offer-model')
const SteamUsers = require('../models/user-model')

const createDBOffer = (offer) => new Promise((resolve, reject) => {

  const dbOffer = SteamOffers({
    offer_id: "UNSET",
    steam_id: offer.steamId,
    user_balance: offer.balance,
    bot_items: offer.bot,
    user_items: offer.user,
    status: "Initialized",
  })

  dbOffer.save((err) => {
    if (!err)
      SteamUsers.findOneAndUpdate({ steamid: offer.steamId }, { '$push': { offers: dbOffer } }, (err, user) => {
        if (!err)
          resolve(dbOffer)
        else reject(err)
      })
    else reject(err)
  })
})

module.exports = createDBOffer