require('dotenv').config();
const CONFIGS = require('../configs/configs')
const manager = require('../configs/steam-setup/steam-manager')
const Items = require('../models/item-model')

const AdminGetBotInventory = () => {
  return new Promise((resolve, reject) => {
    try {
      manager.getUserInventoryContents(CONFIGS.STEAM_INFO.STEAM_BOT_ID, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, async (err, inventory) => {
        if (!err) {
          const items = await Items.find({})
          const itemsMap = items.reduce((obj, item) => {
            obj[item.name] = { ...item._doc, available: true }
            return obj
          }, {})

          resolve(inventory.map(item => itemsMap[item.name.replace('Inscribed ', '')] ? itemsMap[item.name.replace('Inscribed ', '')] : {
            iconUrl: item.icon_url,
            name: item.market_hash_name.replace('Inscribed ', ''),
            nameColor: item.name_color,
            prices: {
              usd: 0,
              vnd: 0
            },
            hero: item.tags[4].name,
            rarity: item.tags[1].name,
            configs: {
              isNonMarket: false,
              isDisabled: false
            },
            available: false
          }))
        }
        else reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = AdminGetBotInventory