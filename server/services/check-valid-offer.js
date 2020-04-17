const getInventory = require('./get-inventory')
const CONFIGS = require('../configs/configs')
const SteamUsers = require('../models/user-model')

const checkUserBalance = (user, moneyItem) => {
  return new Promise((resolve, reject) => {
    SteamUsers.findOne({ steamid: user.steamid }, (err, user) => {
      if (!err)
        if (user.accountBalance >= parseInt(moneyItem.vnd_price.replace(/,/g, ''))) resolve(true)
        else resolve(false)
      else reject(err)
    })
  })
}

const checkValidOffer = (botItemsId, userItemsId, userData) => {
  return new Promise(async (resolve, reject) => {
    const botItemsObj = {}
    const userItemsObj = {}
    let moneyItem = null;
    let checkBalance = false;

    botItemsId.forEach(item => botItemsObj[item.id] ? botItemsObj[item.id]++ : botItemsObj[item.id] = 1)
    userItemsId.forEach(item => {
      userItemsObj[item.id] ? userItemsObj[item.id]++ : userItemsObj[item.id] = 1
      if (item.id === 'moneyItem') moneyItem = item
    })

    try {
      const botInventory = await getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
      const userInventory = await getInventory(userData.steamid)

      const botItems = botInventory.filter(item => botItemsObj[item.id] >= 1)
      const userItems = userInventory.filter(item => userItemsObj[item.id] >= 1)

      const items = {
        bot: botItems,
        user: userItems,
        moneyItem: moneyItem !== null && moneyItem
      }

      if (moneyItem != null)
        checkBalance = await checkUserBalance(userData, moneyItem)
      else checkBalance = true;

      if (checkBalance) resolve(items)
      else reject("Not enough money")
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = checkValidOffer