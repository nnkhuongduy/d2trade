require('dotenv').config();
const CONFIGS = require('../configs/configs')
const Items = require('../models/item-model')

const manager = require('../configs/steam-setup/steam-manager')

const fetchInventory = (steamId) => new Promise((resolve, reject) => {
  manager.getUserInventoryContents(steamId, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
    if (!err) resolve(inventory)
    else reject(err)
  })
})

const fetchOffers = (inventory, steamId) => new Promise((resolve, reject) => {
  manager.getOffersContainingItems(inventory, false, (err, sent, received) => {
    if (!err) {
      const itemsOnBlackList = {};

      sent.forEach(offer => {
        let itemsArray;
        if (steamId === process.env.BOT_STEAM_ID) itemsArray = offer.itemsToGive
        else itemsArray = offer.itemsToReceive
        itemsArray.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1)
      })

      resolve(inventory.filter(item => !itemsOnBlackList[item.id]))

    } else reject(err)
  })
})

const filterItems = (inventory) => new Promise((resolve, reject) => {
  Items.find({}, (err, items) => {
    if (!err) {
      let list = {};

      items.forEach(item => list[item.name] = item)

      resolve(inventory
        .filter(item => list[item.market_hash_name.replace('Inscribed ', '')] && !list[item.market_hash_name.replace('Inscribed ', '')].configs.isDisabled)
        .map(item => ({
          assetId: item.assetid,
          name: item.market_hash_name,
          iconUrl: item.icon_url,
          prices: list[item.market_hash_name.replace('Inscribed ', '')].prices,
          hero: list[item.market_hash_name.replace('Inscribed ', '')].hero,
          rarity: list[item.market_hash_name.replace('Inscribed ', '')].rarity,
        }))
      )
    }
    else reject(err)
  })
})

const getInventory = steamId => {
  return new Promise(async (resolve, reject) => {
    try {
      let inventory = await fetchInventory(steamId)

      inventory = await fetchOffers(inventory, steamId)

      inventory = await filterItems(inventory)

      resolve(inventory)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = getInventory;