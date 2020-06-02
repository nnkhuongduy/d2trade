require('dotenv').config();
const CONFIGS = require('../configs/configs')
const manager = require('../configs/steam-setup/steam-manager')

const AdminGetBotInventory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const newInventory = []

      manager.getUserInventoryContents(CONFIGS.STEAM_INFO.STEAM_BOT_ID, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
        if (!err) {
          inventory
            .forEach(item => newInventory.push({
              icon_url: item.icon_url,
              name: item.market_hash_name,
              nameColor: item.name_color,
              prices: {
                usd: 0,
                vnd: 0
              },
              hero: item.tags[4].name,
              rarity: item.tags[1].name,
              configs: {
                isInscribed: false,
                isNonMarket: false,
                isDisabled: false
              }
            }))

          resolve(newInventory)
        }
        else reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = AdminGetBotInventory