const SteamUsers = require('../models/user-model')

const userTransaction = (userData, moneyItem, type) => {
  return new Promise((resolve, reject) => {
    let updateObj = {};

    if (type === "transaction")
      updateObj = { accountBalance: userData.accountBalance - parseInt(moneyItem.vnd_price.replace(/,/g, '')) }
    if (type === "refund")
      updateObj = { accountBalance: userData.accountBalance + parseInt(moneyItem.vnd_price.replace(/,/g, '')) }

    if (updateObj.accountBalance !== undefined)
      SteamUsers.findOneAndUpdate({ steamid: userData.steamid }, updateObj, (err) => {
        if (!err) {
          resolve();
        } else reject(err)
      })
    else reject("Transaction failed!")
  })
}

module.exports = userTransaction;