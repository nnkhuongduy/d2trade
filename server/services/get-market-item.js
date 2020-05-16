const community = require('../configs/steam-setup/steam-community')
const getCurrencyRate = require('./get-currency-rate')
const CONFIGS = require('../configs/configs')

const getMarketItem = itemName => {
  return new Promise((resolve, reject) => {
    community.getMarketItem(CONFIGS.STEAM_INFO.APP_ID, itemName, (err, item) => {
      if (!err)
        if (item.commodity)
          getCurrencyRate()
            .then(rate => {
              resolve({
                name: item.firstAsset.market_hash_name.replace('Inscribed ', ''),
                icon_url: item.firstAsset.icon_url,
                prices: {
                  usd: parseFloat(item.lowestPrice) / 100,
                  vnd: Math.ceil((parseFloat(item.lowestPrice) / 100) * rate) * 1000
                }
              })
            })
            .catch(err => reject(err))
        else reject("Can't find item on market")
      else reject(err)
    })
  })
}

module.exports = getMarketItem