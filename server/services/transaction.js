const SteamUsers = require('../models/user-model')

const userTransaction = (reqUserData, moneyCheck, moneyItem, type) => {
  return new Promise((resolve, reject) => {
    let updateObj = {};

    if (type === "transaction")
      updateObj = { accountBalance: reqUserData.accountBalance - parseInt(moneyItem.vnd_price.replace(/,/g, '')) }
    if (type === "refund")
      updateObj = { accountBalance: reqUserData.accountBalance + parseInt(moneyItem.vnd_price.replace(/,/g, '')) }

    if (moneyCheck && updateObj.accountBalance !== undefined)
      SteamUsers.findOneAndUpdate({ steamid: reqUserData.steamid }, updateObj, (err) => {
        if (!err) {
          console.log(type === 'transaction' ? 'transaction completed!' : "refund completed!")
          resolve();
        } else reject(err)
      })

    // SteamUsers.findOneAndUpdate({ steamid: reqUserData.steamid }, updateObj, (err) => {
    //   if (err) {
    //     console.log(err);
    //     isCallback && callback(false)
    //   } else {
    //     console.log(type === 'transaction' ? 'transaction completed!' : "refund completed!")
    //     isCallback && callback(true)
    //   }
    // })
    else reject("Transaction failed!")
  })
}

module.exports = userTransaction;