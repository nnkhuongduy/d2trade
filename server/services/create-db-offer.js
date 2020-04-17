const SteamOffers = require('../models/offer-model')

const createDBOffer = (botItems, userItems, user, offerId) => {
  return new Promise((resolve, reject) => {

    const dbOffer = SteamOffers({
      offer_id: offerId,
      steam_id: user.steamid,
      bot_items: botItems,
      user_items: userItems,
      status: "Created",
    })

    dbOffer.save((err) => {
      if (!err)
        resolve(dbOffer)
      else reject(err)
    })
  })
}

module.exports = createDBOffer