require('dotenv').config();
const CONFIGS = require('../configs/configs')
const SiteSettings = require('../models/site-settings-model')

const manager = require('../configs/steam-setup/steam-manager')

const getInventory = steamId => {
  return new Promise((resolve, reject) => {
    const moneyItem = {
      id: 'moneyItem',
      icon_url: 'https://img.topbank.vn/2018/05/03/jDFnkIeH/credit-card-f988.jpg',
      market_hash_name: 'Account Balance',
      tags: [
        { color: 'e4ae39' },
        { color: 'e4ae39', name: "Account Balance" }
      ],
      market_price: '0',
    }

    manager.getUserInventoryContents(steamId, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
      if (!err) {
        const itemsOnBlackList = {};

        manager.getOffersContainingItems(inventory, false, (err, sent, received) => {
          if (!err) {
            if (steamId !== CONFIGS.STEAM_INFO.STEAM_BOT_ID)
              sent.forEach(offer => offer.itemsToReceive.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1))

            inventory = inventory.filter(item => !itemsOnBlackList[item.id]);

            if (steamId !== CONFIGS.STEAM_INFO.STEAM_BOT_ID)
              inventory.unshift(moneyItem)

            SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, rate) => {
              if (!err) {
                inventory.forEach(item => {
                  const randPrice = (Math.random() * (10 - 0.01) + 0.01).toFixed(2)
                  item.market_price = item.id !== 'moneyItem' ? randPrice : "0.00";
                  item.vnd_price = item.id !== 'moneyItem' ? Math.round((parseFloat(randPrice) * rate.currencyRate * 1000)).toLocaleString() : '0';
                })

                resolve(inventory)
              } else reject(err)
            })

          } else reject(err)
        })
      } else reject(err)
    })

    // manager.getUserInventoryContents(steamId, CONFIGS.STEAM_INFO.APP_ID, CONFIGS.STEAM_INFO.CONTEXT_ID, true, (err, inventory) => {
    //   if (err) reject("Can't get bot inventory")
    //   else {
    //     const itemsOnBlackList = {};

    //     manager.getOffersContainingItems(inventory, false, (err, sent, received) => {
    //       if (err) {
    //         res.statusMessage = "Can't get offers containing user item(s)";
    //         res.sendStatus(503);
    //       } else {
    //         sent.forEach(offer => offer.itemsToReceive.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1))

    //         inventory = inventory.filter(item => !itemsOnBlackList[item.id]);

    //         inventory.unshift(moneyItem)

    //         SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, rate) => {
    //           if (!err) {
    //             inventory.forEach(item => {
    //               const randPrice = (Math.random() * (10 - 0.01) + 0.01).toFixed(2)
    //               item.market_price = item.id !== 'moneyItem' ? randPrice : "0.00";
    //               item.vnd_price = item.id !== 'moneyItem' ? Math.round((parseFloat(randPrice) * rate.currencyRate * 1000)).toLocaleString() : '0';
    //             })

    //             res.json(inventory)
    //           } else res.sendStatus(503)
    //         })
    //       }
    //     })

    //   }
    // })
  })
}

module.exports = getInventory;