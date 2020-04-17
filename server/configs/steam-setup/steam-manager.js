const TradeOfferManager = require('steam-tradeoffer-manager');

const client = require('./steam-client')
const community = require('./steam-community')
const SteamOffers = require('../../models/offer-model')

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
  SteamOffers.findOneAndUpdate({ offer_id: offer.id }, { status: TradeOfferManager.ETradeOfferState[offer.state] }, (err) => {
    if (!err) {
      console.log("Successfully update offer state in db!")
    } else {
      console.log(err);
    }
  })

  console.log(`Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]} -> ${TradeOfferManager.ETradeOfferState[offer.state]}`);
})

module.exports = manager;