require('dotenv').config();
const CONFIGS = require('../configs/configs')
const SiteSettings = require('../models/site-settings-model')

const manager = require('../configs/steam-setup/steam-manager')

const getInventory = steamId => {
  return new Promise((resolve, reject) => {
    manager.getUserInventoryContents(steamId, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
      if (!err)
        manager.getOffersContainingItems(inventory, false, (err, sent, received) => {
          if (!err) {
            const itemsOnBlackList = {};

            sent.forEach(offer => {
              let itemsArray;
              if (steamId === process.env.BOT_STEAM_ID) itemsArray = offer.itemsToGive
              else itemsArray = offer.itemsToReceive
              itemsArray.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1)
            })

            inventory = inventory.filter(item => !itemsOnBlackList[item.id]);

            SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, rate) => {
              if (!err) {
                inventory.forEach(item => {
                  const randPrice = (Math.random() * (10 - 0.01) + 0.01).toFixed(2)
                  item.market_price = randPrice;
                  item.vnd_price = Math.round((parseFloat(randPrice) * rate.currencyRate * 1000)).toLocaleString();
                })

                resolve(inventory)
              } else reject(err)
            })

          } else reject(err)
        })
      else reject(err)
    })
  })
}

module.exports = getInventory;