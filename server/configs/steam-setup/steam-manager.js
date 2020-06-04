const TradeOfferManager = require('steam-tradeoffer-manager');

const client = require('./steam-client')
const community = require('./steam-community')
const SteamOffers = require('../../models/offer-model')
const userTransaction = require('../../services/user-transaction')

const manager = new TradeOfferManager({
  "steam": client,
  "domain": "yespubg.com",
  "language": 'en'
});

client.on("webSession", (sessionid, cookies) => {
  manager.setCookies(cookies)

  community.setCookies(cookies);
})

manager.on('sentOfferChanged', (offer, oldState) => {
  SteamOffers.findOneAndUpdate({ offer_id: offer.id }, { status: TradeOfferManager.ETradeOfferState[offer.state] }, { new: true }, (err, offer) => {
    if (!err && offer) {
      console.log(`Successfully update offer #${offer.offer_id}'s state in db!`)
      if (offer.status === "Declined" && offer.user_balance !== null)
        userTransaction(offer.steam_id, offer.user_balance)
          .then(() => console.log(`Successfully refund offer #${offer.offer_id}!`))
          .catch((err) => {
            console.log(err);
            console.log(`ERROR REFUNDING USER'S ID: ${offer.steam_id}`)
          })
    } else {
      console.log(err);
    }
  })

  console.log(`Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]} -> ${TradeOfferManager.ETradeOfferState[offer.state]}`);
})

module.exports = manager;