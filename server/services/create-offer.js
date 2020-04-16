const manager = require('../configs/steam-setup/steam-manager')
const CONFIGS = require('../configs/configs')


const getInventory = (steamId) => {
  return new Promise((resolve, reject) => {
    manager.getUserInventoryContents(steamId, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
      if (!err) {
        resolve(inventory)
      }
      else reject(err)
    })
  })
}

const createOffer = (botItemsId, userItemsId, userData) => {
  return new Promise(async (resolve, reject) => {
    //const offer = manager.createOffer(userData.tradeOfferUrl);

    const botInventory = await getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
    const userInventory = await getInventory(userData.steamid)

    const botItemsObj = {}
    const userItemsObj = {}

    botItemsId.forEach(item => botItemsObj[item.id] ? botItemsObj[item.id]++ : botItemsObj[item.id] = 1)
    userItemsId.forEach(item => userItemsObj[item.id] ? userItemsObj[item.id]++ : userItemsObj[item.id] = 1)

    const botItems = botInventory.filter(item => botItemsObj[item.id] >= 1)
    const userItems = userInventory.filter(item => userItemsObj[item.id] >= 1)

    console.log(botItems)
    console.log(userItems)
  })
}

module.exports = createOffer