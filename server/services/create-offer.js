const manager = require('../configs/steam-setup/steam-manager')
const SteamUsers = require('../models/user-model')
const getInventory = require('./get-inventory')
const CONFIGS = require('../configs/configs')

const createOffer = (botItems, userItems, steamId) => new Promise(async (resolve, reject) => {
  try {
    const user = await SteamUsers.findOne({ steamid: steamId });

    const offer = manager.createOffer(user.tradeOfferUrl);

    const botSteamItems = botItems.map(item => ({ ...item, id: item.assetId, appid: CONFIGS.STEAM_INFO.APP_ID, contextid: CONFIGS.STEAM_INFO.CONTEXT_ID }))
    const userSteamItems = userItems.map(item => ({ ...item, id: item.assetId, appid: CONFIGS.STEAM_INFO.APP_ID, contextid: CONFIGS.STEAM_INFO.CONTEXT_ID }))

    offer.addMyItems(botSteamItems)
    offer.addTheirItems(userSteamItems)

    resolve(offer);

  } catch (err) {
    reject(err)
  }
})

module.exports = createOffer