const getInventory = require('../services/get-inventory')
const CONFIGS = require('../configs/configs')

const AdminGetBotInventory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const newInventory = []

      getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
        .then(inventory => {
          inventory
            .filter(item => item.tags[1].name === 'Immortal' || item.tags[1].name === 'Arcana')
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
        })
        .catch(err => reject(err))
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = AdminGetBotInventory