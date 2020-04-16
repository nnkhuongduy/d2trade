const manager = require('../configs/steam-setup/steam-manager')
const CONFIGS = require('../configs/configs')


const getInventory = (steamId) => {
  return new Promise((resolve, reject) => {
    console.log("start getting inventory")

    manager.getUserInventoryContents(steamId, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
      if (!err) {
        console.log("done getting inventory")

        resolve(inventory)
      }
      else reject(err)
    })
  })
}

const createOffer = (botItemsId, userItemsId, userData) => {
  return new Promise(async (resolve, reject) => {
    //const offer = manager.createOffer(userData.tradeOfferUrl);

    console.log("yoo");

    const botInventory = await getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
    const userInventory = await getInventory(userData.steamid)

    const botItems = botInventory.filter(item => botItemsId.includes(item.id))
    const userItems = userInventory.filter(item => userItemsId.includes(item.id))

    console.log(botItems)
    console.log(userItems)
  })
}

module.exports = createOffer