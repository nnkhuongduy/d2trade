const manager = require('../configs/steam-setup/steam-manager')

const createOffer = (botItems, userItems, userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const offer = manager.createOffer(userData.tradeOfferUrl);

      offer.addMyItems(botItems)
      offer.addTheirItems(userItems)

      resolve(offer);

    } catch (err) {
      reject(err)
    }
  })
}

module.exports = createOffer